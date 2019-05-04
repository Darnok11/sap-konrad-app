const { buildSchema } = require('graphql');


/**
 * GraphQl schema
 * @type {Object}
 */
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
      director: String
      rating: Float!
      actors: [String]
      createdAt: String!
      review: String
   }

   # Scalar needed to define files to upload
   scalar Upload

   type Mutation {
      createMovie(input: MovieInput): Movie
      deleteMovie(id: ID!): Movie
      updateReview(id: ID!, review: String!): Movie
   }

   type Query {
      # if id given return one Movie, if no arguments than return sorted list of Movies by rating

      movies(skip: Int, per_page: Int, id: ID): [Movie]
      count: Int
   }
`);

module.exports = schema;
