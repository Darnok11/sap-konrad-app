const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;


/**
 *
 * @type {Schema}  Because createdAt is not valid ISO date type is String
 */
const schema = new Schema({
   id: {
      type: String,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   director: String,
   rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true
   },
   actors: Object,
   createdAt: {
      type: String,
      required: true
   },
   review: String
});

const Movie = mongoose.model("Movie", schema);

// now paste (export) to collection / model - schema
module.exports = Movie;
