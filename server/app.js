const express = require('express');
const schema = require('./graphql/schema');
const root =require('./graphql/root');
const mongoose = require("mongoose");
const graphqlHTTP = require('express-graphql');
const fs = require('fs');
const cors = require('cors');
const Grid = require('gridfs-stream');

/**
 * Production Atlas mongo database with my IP
 * @type {String}
 */
const prodURI = "mongodb+srv://konrazem:test123@sap-konrad-app-atlas-cluster-gqpdf.mongodb.net/db?retryWrites=true";

/**
 * Localhost / development mongo database
 * @type {String}
 */
const devURI = "mongodb://localhost:27017/db?connectTimeoutMS=1000&bufferCommands=false";

// connect to database with timeout function
mongoose.connect(devURI, {
   useNewUrlParser: true,
   socketTimeoutMS: 0,
   keepAlive: true,
   reconnectTries: 30
});

//check connection
const conn = mongoose.connection;
conn.on('connected', () => console.log('Connected :)'));
conn.on('error', (err) =>  console.log(err) );
conn.on('disconnected', () => console.log('Disconnected :('));


// gridfs-stream variable for file streaming
let gfs;

/*
Event listener callback fn fired when connected to db. The db must already be opened before calling createWriteStream or createReadStream.
 */
mongoose.connection.once('open', () => {
   console.log('Opened');
   gfs = Grid(conn.db, mongoose.mongo);

});


// create express server
const app = express();

//allow Cross-origin resource sharing for Express middleware
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
   console.log('listen...');
});



/**
 * @todo:

 curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"query": "{ movies { title } }"}' \
 http://localhost:4000/graphql
 */
