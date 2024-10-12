// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Create a new MongoClient instance
client = new MongoClient(uri, options);
console.log("Connecting to MongoDB...");

// Use the connect method to connect to the database
clientPromise = client.connect().then(() => {
  console.log("MongoDB connected!");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

export default clientPromise;


