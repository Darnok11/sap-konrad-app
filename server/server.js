const { graphqlUploadExpress } = require('graphql-upload');
const graphqlHTTP = require('express-graphql');
const mongoose = require("mongoose");
const express = require('express');
const schema = require('./graphql/schema');
const cors = require('cors');
const root = require('./graphql/root');
const os = require('os');
const hostname = os.hostname();

let localhost = "";
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
   err && console.log(err);
   localhost = add; //?
  console.log('addr: ' + add);
});

const win_docker_localhost = "192.168.99.100";
// atlas mongo database
const atlasURI = "mongodb+srv://konrazem:test123@sap-konrad-app-atlas-cluster-gqpdf.mongodb.net/db?retryWrites=true";
// local mongo database
// localhost = "127.0.0.1";
const localURI = "mongodb://localhost:27017/db?connectTimeoutMS=1000&bufferCommands=false";


// const dockerURI = "mongodb://localhost:27017/db?connectTimeoutMS=1000&bufferCommands=false";
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




   // TODO: here GRIDFS






//-----------------------------------------------------
   // apply graphql schema and resolvers! Also apply upload files
   app.use('/graphql',
      graphqlUploadExpress({ maxFileSize: 1000, maxFiles: 10 }),
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
   }));

   app.listen(8081, () => {
      console.log('=> listen express server...');
   });
});

conn.on('disconnected', () => console.log('=> mongoose disconnected'));
