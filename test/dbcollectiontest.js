const { MongoClient } = require('mongodb');
require('dotenv').config(); // Ensure this line is present to load environment variables from .env.local

const uri = process.env.MONGO_URI

if (!uri) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function listDatabasesAndCollections() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const databases = await client.db().admin().listDatabases();

    for (const dbInfo of databases.databases) {
      console.log(`Database: ${dbInfo.name}`);
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      for (const collection of collections) {
        console.log(` - Collection: ${collection.name}`);
      }
    }
  } catch (error) {
    console.error('Error listing databases and collections:', error);
  } finally {
    await client.close();
  }
}

listDatabasesAndCollections();
