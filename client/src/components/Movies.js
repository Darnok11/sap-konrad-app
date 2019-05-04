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

      const { count, per_page, text, pages } = this.props;

      // conver to number
      let struct = {
         count: +count,
         per_page: +per_page,
         pages: +pages,
         current_page: +this.state.current_page
      }

      let skip = (this.state.current_page - 1) * struct.per_page;

      return (
      <Query query={MOVIES_QUERY}  variables={{skip: skip, per_page: struct.per_page}}>
         {({ data: { movies } = {}, loading, error }) => {
            if (loading) return <p>{text.loading}</p>;

            //In case of runtime error with graphQLErrors and networkError properties
            if (error) return <p>{error.message}</p>;

            if (typeof movies === "undefined" ) {
               /**
                * NOTE: data object do not have prototype nor constructor reference (no 'hasOwnProperty').
                */

               return <p>{text.no_movies}</p>;
            }

            return (<div>
               {movies.map( (movie, index) =>  <Movie key={"movie-" + index} movie={movie} last={index === struct.per_page - 1} text={text} />)}
               <Footer
                  text={text}
                  loadNext={this.loadNext}
                  loadPrev={this.loadPrev}
                  current_page={this.state.current_page}
                  pages={pages}/>
            </div>);
         }}
         </Query>
      )
   }
}



export default withApollo(Movies);
