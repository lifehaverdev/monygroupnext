'use server'

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    console.log('Using cached database instance');
    await client.db("admin").command({ ping: 1 });
    return cachedClient;
  }

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    cachedClient = client;
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
    return cachedClient;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

module.exports = connectToDatabase;
