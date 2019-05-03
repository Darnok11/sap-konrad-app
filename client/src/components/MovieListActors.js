import React from 'react';


const MovieListActors = ( props ) => {
   return (
      <div>
         {props.actors.map( (actor, index) =>
            <span className="sap-movie-actor" key={"actor-" + index}>
               { index + 1 === props.actors.length ? actor : actor + "," }
            </span>
         )}
      </div>
   );
}


export default MovieListActors;
