const { buildSchema } = require('graphql');

const schema = buildSchema(`
   # non-nullable are id and createdAt

   input MovieInput {
      title: String!
      director: String
      rating: Float!
      actors: [String]
   }


   type Movie {
      id: ID!
      title: String!
      director: String!
      rating: Float!
      actors: [String]!
      createdAt: String!
      review: String
   }


   type Mutation {
      createMovie(input: MovieInput): Movie
      deleteMovie(id: ID!): Movie
      createReview(id: ID!, review: String!): Movie
      updateReview(id: ID!, review: String!): Movie
   }

   type Query {
      # if id given return one Movie
      movies(start: Int, end: Int, id: ID): [Movie]
   }
`);

module.exports = schema;


/**
   //NOTE:
   how to use mutation:

   mutation {
  createMovie(input: {
    title: "Batman i Pingwin",
    director: "Konrad",
    rating: 0.23,
    actors: ["Superman", "IronMan", "Aquaman"],


     }

     ) {
       id
       createdAt
     }
   }

*/
