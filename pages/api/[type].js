import { connectToDatabase } from "../../mongodb";

export default async function handler(req, res) {
  const { type } = req.query;

  try {
    const { client, db } = await connectToDatabase();

    const collectionName = type; // Use the type as the collection name
    const collection = db.collection(collectionName);
    // Query the collection to get the data you need
    const data = await collection.find({}).toArray();
    

    client.close();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
