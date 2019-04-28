import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { MOVIES_QUERY } from '../graphql/queries';
import Movie from './Movie';

/**
 * Stateless component that take movies form database and display them on current page. If there are no movies, display message.
 * @param {Object} props
 * @extends Component
 * @return {Object}  Array of Movie components
 */
class Movies extends Component {

   render() {
      const on_page = 3;
      const { text, count } = this.props;

      const pages = Math.ceil(count / on_page);
      const page = this.state.page;


      let first = (page - 1) * on_page;
      let last = (page === pages) ? count : first + on_page;

      console.log("first and last: " + first + " " + last);

      return (
      <Query query={MOVIES_QUERY} variables={{skip: 2, limit: 4}}>
         {({ data, loading, error }) => {
            if (loading) return <p>{text.loading}</p>;
            if (error) return <p>{error.message}</p>;

            return <div>
                 {data.movies.map( (movie, index) =>
                    <Movie
                    key={"movie-" + index}
                    movie={movie}
                    last={index + 1 === last - first}
                    text={this.props.text} />
                 )}
              </div>;
         }}
         </Query>
      )
   }
}

export default Movies;
