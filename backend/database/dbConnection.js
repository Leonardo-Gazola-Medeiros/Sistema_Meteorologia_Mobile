const { MongoClient, ServerApiVersion } = require('mongodb');

const dbName = 'api5';

const uri = "mongodb+srv://fatec:fatec@fullstack.pt0hp.mongodb.net/?retryWrites=true&w=majority&appName=fullstack";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbInstance = null; // Cache the database instance to reuse connections

const connectToDatabase = async () => {
  try {
    if (dbInstance) {
      return dbInstance; // Return cached database instance
    }

    // Connect the client to the server
    await client.connect();

    // Ping the database to confirm a successful connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged api5. You successfully connected to MongoDB!");

    dbInstance = client.db(dbName); // Cache the database instance
    return dbInstance;

  } catch (error) {
    throw new Error('Erro ao conectar ao MongoDB: ' + error.message);
  }
};

module.exports = connectToDatabase;
