import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_MOVIE } from '../graphql/mutations';


export default function DeleteMovie( props ) {

   const { text, movie_to_remove } = props;
   return (
      <Mutation mutation={ DELETE_MOVIE } onCompleted={( data ) => { alert("movie was removed! Referesh the page ;) I do not have time for this.")}}>
         {(deleteMovie, { data: { movie } = {}, loading, error }) => (
            <div className="sap-movie-mutation">
               <button onClick={(e) => {
                     e.preventDefault();
                     deleteMovie({ variables: { id: movie_to_remove } });

                  }}> {text.delete} </button>
                  <p className="sap-movie-mutation-message">
                     {loading && text.loading} {error && text.error}
                  </p>
            </div>
         )}
      </Mutation>
   );
}
