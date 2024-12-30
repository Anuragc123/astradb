import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL);

export async function connectDB() {
  try {
    const collections = await db.listCollections();
    console.log("Connected to AstraDB. Collections:", collections);
  } catch (err) {
    console.error("Error connecting to AstraDB:", err.message);
  }
}

connectDB();
export default db;
