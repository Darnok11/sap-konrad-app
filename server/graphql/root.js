const schema = require('./schema');
const Movie = require('../model/movie'); //mongodb model
const { generateSubstringOfISODate, generateId } = require('../helperFunctions'); // helper functions


/**
 * Provides a resolver functions for each API endpoint
 * @type {Object}
 */
const root = {

   /**
    * 3 methods for finding movies
    * @param  {Object} args [description]
    * @return {[Movie, [Movie], [Movie]]}  return one movie if id given, all movies sorted by review if args empty and some movies if start and end arguments are given
    */
   movies: function(args) {
      if (args.hasOwnProperty('id')) {

            return [Movie.findOne({ id: args.id }, (err, doc) => console.log("No such id: " + args.id))];

      } else if (args.hasOwnProperty('start') && args.hasOwnProperty('end')) {

        return Movie.find({}).skip(args.start).limit(args.end);

      } else {
         // return all movies sorted ascending by review
         return Movie.find({}).sort('review');
      }
   },

   /**
    * Add new movie
    * @param  {Movie} input without id createdAt
    * @return {[type]}       created Movie
    */
   createMovie: function ({input}) {
      // Create a random id for our "database".
      input.id = generateId();
      input.createdAt = generateSubstringOfISODate();

      let movie = new Movie(input);
      return movie.save(); // save to collection movie
   },

   /**
    * Delete movie by id
    * @param  {Object} args movie id
    * @return {Movie}  Deleted movie
    */
   deleteMovie: function(args) {
      //id must be given
      const movie_to_remove = Movie.findOneAndRemove( {id: args.id}).exec();

      if (!movie_to_remove) {
         console.log("Could not remove");
      }

      return movie_to_remove;
   },

   /**
    * Search for movie by id and update its review
    * @param  {Object} args movie id
    * @return {Movie} mongodb model
    */
   updateReview: function(args) {
      return Movie.findOneAndUpdate(
         {
            id: args.id
         },
         {
            $set: { review: args.review }
         },
         {
            new: true
         }).catch( err => new Error(err));
   },

   /**
    * Need to show number of pages in APP
    * @return {int}  Movie collection size
    */
   count: () => Movie.estimatedDocumentCount()
};

module.exports = root;
