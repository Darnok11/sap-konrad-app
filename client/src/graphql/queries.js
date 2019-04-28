import { gql } from 'apollo-boost';

const REVIEW_QUERY = gql`
   query($id: ID!){
      movies(id: $id) {
         review
      }
   }
`;

const MOVIES_QUERY = gql`
   query($skip: Int!, $limit: Int!){
      movies(skip: $skip, limit: $limit) {
         title
         director
         rating
         actors
         createdAt
      }
   }
`

const LIST_QUERY = gql`
   {
      movies {
         title
         director
         rating
         actors
         createdAt
      }
   }
`;

const COUNT_QUERY = gql`{ count }`;

export { REVIEW_QUERY, MOVIES_QUERY, LIST_QUERY, COUNT_QUERY };
