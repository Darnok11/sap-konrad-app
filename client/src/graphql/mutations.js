import { gql } from 'apollo-boost';
// NOTE: To force automatic update of apollo cache we should keep returning values same as queries => You should make your mutation results have all of the data necessary to update the queries previously fetched. If you want to be more presize use apollo fragments "to share fields between the query and the mutation that affects it"!
// NOTE: However I would like to use direct cache access



const ADD_MOVIE = gql`
   mutation(
      $title: String!,
      $director: String!,
      $rating: Float!,
      $actors: [String!]!,
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
         review
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
         review
         createdAt
      }
   }

`;

const UPDATE_MOVIE = gql`
   mutation($id: ID!, $review: String!) {
      updateReview(id: $id, review: $review) {
         id
         title
         director
         rating
         actors
         review
         createdAt
      }
   }
`;

const UPLOAD_FILE = gql`
   mutation($file: Upload!) {
     uploadFile(file: $file) {
       filename
     }
   }
`;

export { ADD_MOVIE, DELETE_MOVIE, UPDATE_MOVIE, UPLOAD_FILE };
