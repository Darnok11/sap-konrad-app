const express = require('express');
const schema = require('./graphql/schema');
const root =require('./graphql/root');
const mongoose = require("mongoose");
const graphqlHTTP = require('express-graphql');
const uri = "mongodb+srv://konrazem:test123@sap-konrad-app-atlas-cluster-gqpdf.mongodb.net/db?retryWrites=true";

// we use multer-gridfs-storage to handle file storage on mongodb
// we use gridfs-stream  to handle streaming files

//** connecting to data base */
mongoose.connect(uri, {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected :)'));
mongoose.connection.on('error', (err) =>  console.log(err) );
mongoose.connection.on('disconnected', () => console.log('Disconnected :('));

// event listener callback fn fired when connected to db
mongoose.connection.once('open', () => {
   console.log('Connected to database'); // :)
});

/**

curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ movies { title } }"}' \
http://localhost:4000/graphql
*/
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => {
   console.log('listen...');
});
