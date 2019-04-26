import { gql } from 'apollo-boost';


const createMovieMutation = gql`
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


const deleteMovieMutation = gql`
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

const updateReviewMutation = gql`
   mutation($id: ID!, $review: String!) {
      updateReview(id: $id, review: $review) {
         id
         review
      }
   }
`;


export { createMovieMutation, deleteMovieMutation, updateReviewMutation };
