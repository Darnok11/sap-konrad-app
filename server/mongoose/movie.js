/**
 * Files related to Database, in this case mongoose schema and models will be placed here.
 * @type {[type]}
 */


const mongoose = require('mongoose');
require('mongoose-double')(mongoose); // mongoose convert float multi precision to String and then sort do not work
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Check ISO 8601 date format (not extended) YYYY-MM-DDThh:mm:ss±hh:mm not extended!
 * @type {RegExp}
 */
const REGEXP_DATE = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[0-5][0-9]):(0[0-9]|[0-5][0-9]).(\d\d\d)/;



/**
 * Check if letters and spaces only
 * @type {RegExp}
 */
const REGEXP_STRING = /^[a-zA-Z\s]+$/;


const schema = new Schema({
   id: {
      type: String,
      required: true,
      unique: true
   },
   title: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: function(title) {
            return REGEXP_STRING.test(title);
         },
         message: props => `${props.value} is not a valid title!`
      },
   },
   director: String,
   rating: {
      type: Number,
      // type: mongoose.Types.Decimal128,
      min: 1,
      max: 10
   },
   actors: Object,
   createdAt: {
      type: String,
      required: true,
      validate: {
         validator: function(createdAt) {
            return REGEXP_DATE.test(createdAt);
         },
         message: props => `${props.value} is not a valid date!`
      },
   },
   review: String
}, {collection: "movies"});

const Movie = mongoose.model("Movie", schema);

// now paste (export) to collection / model - schema
module.exports = Movie;
