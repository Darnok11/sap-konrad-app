const { graphqlUploadExpress } = require('graphql-upload');
const graphqlHTTP = require('express-graphql');
const mongoose = require("mongoose");
const express = require('express');
const schema = require('./graphql/schema');
const cors = require('cors');
const root = require('./graphql/root');
const dns = require('dns');
const os = require('os');

dns.lookup(os.hostname(), function (err, add, fam) {
   err && console.log(err);
   console.log('addr: ' + add);
});


// atlas mongo database
const atlasURI = "mongodb+srv://konrazem:test123@sap-konrad-app-atlas-cluster-gqpdf.mongodb.net/db?retryWrites=true";
// local mongo database
const localURI = "mongodb://192.168.99.100:27017/db?connectTimeoutMS=1000&bufferCommands=false";


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

   // apply graphql schema and resolvers! Also apply upload files
   app.use('/graphql',
      graphqlUploadExpress({ maxFileSize: 1000, maxFiles: 10 }),
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
   }));

   app.listen(3001, () => {
      console.log('=> listen express server...');
   });
});

conn.on('disconnected', () => console.log('=> mongoose disconnected'));
