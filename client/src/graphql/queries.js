import { gql } from 'apollo-boost';

const reviewQuery = gql`
   query($id: ID!){
      movies(id: $id) {
         review
      }
   }
`;

const moviesQuery = gql`
   query($start: Int!, $end: Int!){
      movies(start: $start, end: $end) {
         title
         director
         rating
         actors
         createdAt
      }
   }
`

const movieListQuery = gql`
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

const countQuery = gql`{ count }`;

export { reviewQuery, moviesQuery, movieListQuery, countQuery };
