import React from 'react';
import '../css/getList.css';
import { Query } from 'react-apollo';
// here will be query that return list of sorted movies by rating
class GetList extends React.Component {
   render() {

      const { text } = this.props;
      return ( <h1>Movies here</h1>);
      // return (
      //    <Query query={MOVIESQ} >
      //       {({ data, loading, error }) => {
      //          if (loading) return <p>{text.loading}</p>;
      //          //In case of runtime error with graphQLErrors and networkError properties
      //          if (error) return <p>{error.message}</p>;
      //
      //          let movies = [];
      //          if (typeof data !== "undefined" ) {
      //             data.movies ? movies = data.movies : movies = "Wrong graphql query?";
      //          }
      //
      //          console.log("Get list movies:   ", movies);
      //             // map trough data movies
      //             return (
      //                <div>
      //                   <h1> Here List of Movies</h1>
      //                </div>
      //             );
      //          }
      //       }}
      //
      //    </Query>
      // );
   }
}

export default GetList;
