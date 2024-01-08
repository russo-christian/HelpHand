const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017/helphanddb";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch(ex) {
        console.error("Error connecting to the database:", ex);
    }
}

runDBConnection();

module.exports = client;