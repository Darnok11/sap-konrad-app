const MongoClient = require('mongodb').MongoClient;
const fsPromises = require('fs').promises;
const express = require('express');
const assert = require('assert');
const cors = require('cors');
const dns = require('dns');
const os = require('os');

dns.lookup(os.hostname(), function (err, add, fam) {
   err && console.log(err);
   console.log('addr: ' + add);
});
//-----------------------------------------------------------------
// Connection URL
// const url = "mongodb://" + ip + ":27017";
const url = "mongodb://192.168.99.100:27017";

// Database name
const dbName = 'db';

// File name
const path = __dirname + "/data/movies.txt";

// Create a new MongoClient
const client = new MongoClient(url,  { useNewUrlParser: true });

//-----------------------------------------------------------------


// connect to express
const app = express();
app.use(cors()); // allow cors
// define list route
app.get('/list', (req, res, next) => {
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
            err && reject(err); //TODO: test for reject
         });
      }); // Promise

      promiseMovies.then( movies => {
         // if I have movies I need to put them in to the file (replace content) on the server thanks to module fs. Creating file is also async thus I need new Promise.
         list = JSON.stringify(movies);
         console.log(list);
         fsPromises.writeFile(path, list).then( value => {
            // the file is created/updated

            res.sendFile(path, "movie-list.txt", (err) => {
               err && console.log(err);
            }); // handle request

         }).catch( (err) => { throw err });

      }).catch( err => {

         res.send(err); //error with finding mongo movies
      }); // promise movies

      // client.close(); // ?
   }); //mongo client connect
   // next();
}); //app.get

// resolve home page
app.get('/', (req, res) => {
   res.send("Here sending files");
});

app.listen(3002, () => {
   console.log("=> express listening...");
});
