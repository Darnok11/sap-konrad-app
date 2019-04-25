const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   id: String,
   title: String,
   director: String,
   rating: Number,
   actors: Object,
   createdAt: String,
   review: String
});

// now paste (export) to collection / model - schema
module.exports = mongoose.model("Movie", schema);
