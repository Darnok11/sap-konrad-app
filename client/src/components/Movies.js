import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { MOVIES_QUERY } from '../graphql/queries';
import Movie from './Movie';
import Footer from './Footer';

/**
 * Stateless component that take movies form database and display them on current page. If there are no movies, display message.
 * @param {Object} props
 * @extends Component
 * @return {Object}  Array of Movie components
 */
class Movies extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         current_page: 1
      };

      this.loadNext = this.loadNext.bind(this);
      this.loadPrev = this.loadPrev.bind(this);
   }

   /**
    * This should update the cache !!! After click load next
    * @param  {[type]} e [description]
    * @return {[type]}   [description]
    */
   loadNext(e) {
      e.preventDefault();

      if (this.state.current_page < this.props.pages) {
         this.setState({ current_page: this.state.current_page + 1 });
      } else { alert( this.props.text.next_alert ); }
   }

   /**
    * This should update the cache !!! After click load prev
    * @param  {[type]} e [description]
    * @return {[type]}   [description]
    */
   loadPrev(e) {
      e.preventDefault();

      if (this.state.current_page > 1) {
         this.setState({ current_page: this.state.current_page - 1 });
      } else { alert( this.props.text.prev_alert ); }
   }

   render() {

      const { count, movies_on_page, text, pages } = this.props;
      let struct = {
         count: +count,
         movies_on_page: +movies_on_page,
         pages: +pages,
         current_page: +this.state.current_page
      }
      // -1 becuase u need to start array from 0 not 1.
      // * number of movies shown on page make shift to start pointer on every page. Moreover cache is normalized - thus structure of this data is different than obtained from database

      let skip = (this.state.current_page - 1) * struct.movies_on_page;
      // if last page than limit is last movie (count)
      // if not than indicate last movie on current page.
      let limit = (this.state.current_page === struct.pages) ? struct.count : skip + struct.movies_on_page;

      return (
      <Query query={MOVIES_QUERY}  variables={{skip: skip, limit: limit}}>
         {({ data, loading, error }) => {
            let movies = [];
            if (loading) return <p>{text.loading}</p>;
            //A runtime error with graphQLErrors and networkError properties
            if (error) return <p>{error.message}</p>;
            //NOTE: this makes adding to cache obtained new data, which means we render all requested movies in 'history' of cache (skip, limit will not do the job). We need to somehow ask for last 3 records to cache ???

            if (typeof data !== "undefined" ) {
               //NOTE: data object do not have prototype nor constructor reference (??)
               data.movies ? movies = data.movies.slice(-struct.movies_on_page) : movies = [];
            }

            return <div>
                 {movies.map( (movie, index) => {
                    return <Movie
                       key={"movie-" + index}
                       movie={movie}
                       last={index + 1 === limit - skip}
                       text={text} />
                 }

              )}
                 <Footer
                    text={text}
                    loadNext={this.loadNext}
                    loadPrev={this.loadPrev}
                    current_page={this.state.current_page}
                    pages={pages}
                    />
              </div>;
         }}
         </Query>
      )
   }
}

export default withApollo(Movies);
