import { MongoClient } from "mongodb";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({ path: fileURLToPath(new URL("./server/.env", import.meta.url)) });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const ping = await client.db().admin().command({ ping: 1 });
  console.log("Atlas connection OK:", JSON.stringify(ping));
  const db = client.db(process.env.MONGODB_DB_NAME || "dev_portfolio");
  const cols = await db.listCollections().toArray();
  console.log("Collections:", cols.map((c) => c.name));
  await client.close();
  console.log("Connection closed successfully.");
} catch (error) {
  console.error("Atlas connection FAILED:", error.message);
  process.exit(1);
}