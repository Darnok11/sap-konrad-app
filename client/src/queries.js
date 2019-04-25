import { gql } from 'apollo-boost';

let i = 0, j = 6; //?


// dont know for now how to manage inputs in gql
const getMovies = gql`
   # movies(frame:[i, j]) {
   #    title
   #    director
   #    rating
   # }

   movies {
      title
      director
      rating
      actors
      createdAt
   }
`;

const getMovie = gql`
   movie($id: ID) {
      title
      director
      rating
      actors
      createdAt
   }
`;

const getReview = gql`
   review($id: ID)
`;
