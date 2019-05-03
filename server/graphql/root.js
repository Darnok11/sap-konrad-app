// const schema = require('./schema');
const Movie = require('../mongoose/movie'); //mogoose model
const {
   generateSubstringOfISODate,
   generateId,
   sortObjectByKey
} = require('../helperFunctions'); // helper functions



/**
 * Provides a resolver functions for each API endpoint
 * @type {Object}
 */
const root = {

   /**
    * 3 methods for finding movies
    * @param  {Object} args arguments in graphql query/mutation
    * @return {[Movie]}  if id given - array with one Movie, if skip and per_page - array of Movies per page, no arguments - array of all Movies sorted by review with descending order.
    */
   movies: function(args) {
      if (args.hasOwnProperty('id')) {
         // return one movie
         return [Movie.findOne({ id: args.id }, (err, doc) => console.log("No such id: " + args.id))];

      } else if (args.hasOwnProperty('skip') && args.hasOwnProperty('per_page')) {
         // return movies for page
         return Movie.find({}).skip(args.skip).limit(args.per_page);

      } else {
         // if no arguments given return all movies sorted by rating with descending order
         const res = Movie.find({}).sort({
            rating: -1
         }).exec();
         return Movie.find({}).sort({
            rating: -1
         });
      }
   },

   /**
    * Add new movie
    * @param  {Object} input in object title and rating are required. Can be also director and actors.
    * @return {Movie}       created Movie
    */
   createMovie: function({ input }) {
      let date = new Date().toISOString();

      // Create a random id with "crypto" and current date.
      input.id = require('crypto').randomBytes(10).toString('hex');
      input.createdAt = date.substring(0, date.length - 1);
      // IDEA:  can be only intiger values!
      input.rating = input.rating.toFixed();

      let movie = new Movie(input);
      return movie.save(); // insert to collection movies
   },


   /**
    * Delete movie by id
    * @param  {Object} args id must be given
    * @return {Movie}      deleted movie
    */
   deleteMovie: function(args) {
      const removedMovie = Movie.findOneAndRemove({
         id: args.id
      }).exec();

      return removedMovie;
   },

   /**
    * Search for movie by id and update its review
    * @param  {Object} args movie id
    * @return {Movie} updated Movie
    */
   updateReview: function(args) {
      return Movie.findOneAndUpdate({ id: args.id }, {
         $set: {
            review: args.review
         }
      }, {
         new: true
      }).catch(err => new Error(err));
   },

   /**
    * Get number of movies in collection movies
    * @return {Number}  Movie collection size
    */
   count: () => Movie.estimatedDocumentCount()
};

module.exports = root;
