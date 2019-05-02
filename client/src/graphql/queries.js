import { gql } from 'apollo-boost';


const REVIEW_QUERY = gql`
   query($id: ID!){
      movies(id: $id) {
         id
         review
      }
   }
`;

// same return types as in ADD_MOVIE
const MOVIES_QUERY = gql`
   query($skip: Int!, $per_page: Int!){
      movies(skip: $skip, per_page: $per_page) {
         id
         title
         director
         rating
         actors
         review
         createdAt
      }
   }
`

const LIST_QUERY = gql`
   {
      movies {
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

const COUNT_QUERY = gql`{ count }`;

export { REVIEW_QUERY, MOVIES_QUERY, LIST_QUERY, COUNT_QUERY };
