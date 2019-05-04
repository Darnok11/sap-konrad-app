const MongoClient = require('mongodb').MongoClient;
const fsPromises = require('fs').promises;
const express = require('express');
const assert = require('assert');
const cors = require('cors');

//-----------------------------------------------------------------
// Connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'db';

// File name
const fname = "movies.txt";

// Create a new MongoClient
const client = new MongoClient(url,  { useNewUrlParser: true });

//-----------------------------------------------------------------


// connect to express
const app = express();
app.use(cors()); // allow cors
app.get('/list', function(req, res) {
   // Use connect method to connect to the Server
   client.connect(function(err) {
      assert.equal(null, err);
      console.log("=> mongodb listening...");

      const db = client.db(dbName);
      // async
      const promiseMovies = new Promise( function(resolve, reject) {
         //sort rating descending
         const op = { "sort": [['rating', 'desc']] };

         db.collection('movies').find({}, op).toArray( (err, docs) => {
            resolve(docs);
            reject(err); //TODO: test for reject
         });
      }); // Promise

      promiseMovies.then( movies => {
         // if I have movies I need to put them in to the file (replace content) on the server thanks to module fs. Creating file is also async thus I need new Promise.
         list = JSON.stringify(movies);
         console.log(list);
         fsPromises.writeFile(fname, list).then( value => {
            // the file is created/updated
            const path = __dirname + "\\" + fname;

            res.download(path); // handle request

         }).catch( (err) => { throw err });

      }).catch( err => {

         res.send(err); //error with finding mongo movies
      }); // promise movies

      client.close() }); //mongo client connect
}); //app.get

app.listen(4002, () => {
   console.log("=> express listening...");
});
