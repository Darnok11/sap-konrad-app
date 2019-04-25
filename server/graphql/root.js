const schema = require('./schema');
// Mongoose
const Movie = require('../model/movie');
// helper functions
const {
   generateSubstringOfISODate,
   generateId,
   compareValues,
   sortObjectByKey,
   sortObjectByKeyDescendingOrder,
   findObjectByValue
} = require('../helperFunctions');

/** The root provides a resolver function for each API endpoint */
const root = {
   movies: function(args) {
      /** if id given return movie with this id even if start and end prop is also given */
      if (args.hasOwnProperty('id')) {

            return [Movie.findOne({ id: args.id }, (err, doc) => console.log("No such id: " + args.id))];

      } else if (args.hasOwnProperty('start') && args.hasOwnProperty('end')) {

        return Movie.find({}).skip(args.start).limit(args.end);
         // return _movies.slice(args.start, args.end);
      } else {
         // return all movies sorted ascending by review
         return Movie.find({}).sort('review');
      }
      // return sortObjectByKey(movies, 'rating');
   },
   createMovie: function ({input}) {
      // Create a random id for our "database".
      input.id = generateId();
      input.createdAt = generateSubstringOfISODate();
      let movie = new Movie(input);
      return movie.save(); // save to collection movie
   },
};

module.exports = root;
