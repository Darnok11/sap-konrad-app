const express = require('express');
//GrphQL
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
let root = require('./graphql/root');
// Upload
const { graphqlUploadExpress } = require('graphql-upload');
// To allow cors
const cors = require('cors');
// Mogoose
const mongoose = require("mongoose");


// atlas mongo database
const atlasURI = "mongodb+srv://konrazem:test123@sap-konrad-app-atlas-cluster-gqpdf.mongodb.net/db?retryWrites=true";
// local mongo database
const localURI = "mongodb://localhost:27017/db?connectTimeoutMS=1000&bufferCommands=false";

/**
 * [client description]
 * @type {[type]}
 */



/**
 * Client settings
 * @type {Promise}
 */
const client = mongoose.connect(localURI, {
   useFindAndModify: false, //for depractication warning
   useCreateIndex: true, // for model type unique depractication (check mongoose/movie.js)
   useNewUrlParser: true,
   socketTimeoutMS: 0,
});


const conn = mongoose.connection;
conn.on('error', ( err ) =>  console.log(err) );
conn.on('connected', () => console.log('=> connected to mongo...'));


// Open
conn.once('open', () => {
   console.log('=> mongoose connection opened');
   // create express server
   const app = express();
   //allow Cross-origin resource sharing for Express middleware
   app.use(cors());











//-----------------------------------------------------
   // apply graphql schema and resolvers! Also apply upload files
   app.use('/graphql',
      graphqlUploadExpress({ maxFileSize: 1000, maxFiles: 10 }),
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
   }));

   app.listen(4000, () => {
      console.log('=> listen express server...');
   });
});

conn.on('disconnected', () => console.log('=> mongoose disconnected'));
