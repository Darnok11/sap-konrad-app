const mongoose = require("mongoose");

// export let db;
//
// export async function connect() {
//   if (db) return
//   const client = await MongoClient.connect(process.env.DB_URI)
//   db = client.db('yourdbname')
// }
//
//

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

// connect to database with timeout function. useFindAndModify for depractication warning
// useCreateIndex: collection.ensureIndex is deprecated. Use createIndexes instead. #6890
const client = mongoose.connect(devURI, {
   useCreateIndex: true,
   useFindAndModify: false,
   useNewUrlParser: true,
   socketTimeoutMS: 0,
});



const db = client.db('db');

//check connection
const conn = mongoose.connection;
conn.on('connected', () => console.log('connected to mongo...'));
conn.on('error', (err) =>  console.log(err) );
conn.on('disconnected', () => console.log('Disconnected from MongoDB'));


/*
Event listener callback fn fired when connected to db. The db must already be opened before calling createWriteStream or createReadStream.
 */
mongoose.connection.once('open', () => {
   console.log('connection opened');
});
