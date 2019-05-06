import React from 'react';
import '../css/getList.css';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { LIST_QUERY } from '../graphql/queries';

// here will be query that return list of sorted movies by rating
class GetList extends React.Component {
   render() {

      const { text } = this.props;

      return (
         <div className="sap-movie">
            <div className="App-header-buttons">
               <Link to="/" className='sap-button'>{text.go_back}</Link>
            </div>
            <Query query={LIST_QUERY} >
               {({ data: { movies } = {}, loading, error }) => {
                  if (loading) return <p>{text.loading}</p>;
                     if (error) return <p>{error.message}</p>;

                        // map trough data movies
                        return (


                           <div className="sap-movie-list">
                              {movies.map( (movie, index) =>
                                 <MovieList key={"list-movie-key-" + index} movie={movie} text={text} />

                              )}
                           </div>
                        );
                     }}
                  </Query>
         </div>
      );
   }
}

const MovieList = ( props ) => {
   const { movie, text } = props;
   return (
      <div className="app-movie-list">
         <ul>
            <li><span className="sap-movie-title">{text.title + ": "}</span>{movie.title || text.not_given}</li>
            <li><span className="sap-movie-director">{text.director + ": "}</span>{movie.director || text.not_given}</li>
            <li><span className="sap-movie-rating">{text.rating + ": "}</span>{movie.rating || text.not_given}</li>
            <li><span className="sap-movie-actors">{text.actors + ": "}</span>{movie.actors || text.not_given}</li>
            <li><span className="sap-movie-createdAt">{text.createdAt + ": "}</span>{movie.createdAt || text.not_given}</li>
         </ul>
      </div>
   )
}

export default GetList;
