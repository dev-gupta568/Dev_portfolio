import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

let client;
let database;

export async function connectDatabase() {
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error("MONGODB_URI is required to start the API server.");
  }

  const mongoClient = new MongoClient(connectionString);
  try {
    await mongoClient.connect();
    const connectedDatabase = mongoClient.db(process.env.MONGODB_DB_NAME || "dev_portfolio");
    await connectedDatabase.command({ ping: 1 });
    client = mongoClient;
    database = connectedDatabase;
  } catch (error) {
    await mongoClient.close();
    throw error;
  }
}

export function getMessagesCollection() {
  if (!database) {
    throw new Error("MongoDB has not been connected.");
  }

  return database.collection("messages");
}

export async function pingDatabase() {
  if (!database) {
    throw new Error("MongoDB has not been connected.");
  }

  await database.command({ ping: 1 });
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
}
