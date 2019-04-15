export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const ADD_MOVIE = 'ADD_MOVIE';
export const DEL_MOVIE = 'DEL_MOVIE';
export const GET_MOVIES = 'GET_MOVIES';
export const GET_LIST = 'GET_LIST';

export const UPDATE_REVIEW_REQ = 'UPDATE_REVIEW';
export const ADD_MOVIE_REQ = 'ADD_MOVIE';
export const DEL_MOVIE_REQ = 'DEL_MOVIE';
export const GET_MOVIES_REQ = 'GET_MOVIES';
export const GET_LIST_REQ = 'GET_LIST';

/* There are some async action creators, where status field is needed for 3 types of statuses :) */

{
   type: ADD_REVIEW,

}

// network request actions
// ----------------------------------------------------


// need to pass id and text / review which you want to update
export function updateReview( review ) {
   return {
     type: UPDATE_REVIEW,
     review
   };
}

// we need to able to add new movie. What if there is already such movie?
export function addMovie( _cos ) {
   return {
     type: ADD_MOVIE,
     _cos
   };
}

// send request to delete movie. What if wrong id ?
export function deleteMovie( id ) { //ID?
   return {
      type: DEL_MOVIE,
      id
   }
}

// send request for loading more movies (or going with frame of pages?)
export function requestMovies( movies ) {
   return {
     type: GET_MOVIES,
     movies
   };
}


export function getList( list ) {
   return {
      type: GET_LIST,
      list
   }
}

// user actions
// ----------------------------------------------------
// send request for loading more movies (or going with frame of pages?)
export function loadMovies( move ) { // increment or decrement pages
   return {
     type: LOAD_MOVIES,
     move
   };
}



// ----------------------------------------------------

// TODO: the same do with reviews!

// const limit = 20 // hom many movies to load to APP from API
export const requestMovies = limit => ({
  type: REQUEST_MOVIES,
  limit
})

export const receiveMovies = (limit, json) => ({
  type: RECEIVE_MOVIES,
  limit,
  movies: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})


const fetchMovies = limit => dispatch => {
  dispatch(requestMovies(limit))
  return fetch(`https://localhost:3000/api/movies/${limit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveMovies(limit, json)))
}
// service with movies `https://localhost:3000/mongodb/movies/${limit}.json`
