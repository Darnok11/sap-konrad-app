// NOTE: You should make your mutation results have all of the data necessary to update the queries previously fetched.

import { gql } from 'apollo-boost';


const ADD_MOVIE = gql`
   mutation(
      $title: String!,
      $director: String!,
      $rating: Float!,
      $actors: [String]!,
   ) {
      createMovie(input: {
         title: $title,
         director: $director,
         rating: $rating,
         actors: $actors,
      }) {
         id
         title
         director
         rating
         actors
         createdAt
      }
   }
`;


const DELETE_MOVIE = gql`
   mutation($id: ID!) {
      deleteMovie(id: $id) {
         id
         title
         director
         rating
         actors
         createdAt
      }
   }

`;

const UPDATE_MOVIE = gql`
   mutation($id: ID!, $review: String!) {
      updateReview(id: $id, review: $review) {
         id
         review
      }
   }
`;


export { ADD_MOVIE, DELETE_MOVIE, UPDATE_MOVIE };
