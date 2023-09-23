import { connectToDatabase } from "../../mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { clubName, type } = req.body;

    try {
      const { client, db } = await connectToDatabase();

      let collectionName;
      if (type === "club") {
        collectionName = "clubs";
      } else if (type === "webinar") {
        collectionName = "webinars";
      } else if (type === "competetion") {
        collectionName = "competetions";
      } else {
        collectionName = "workshops";
      }

      const collection = db.collection(collectionName);
(db.databaseName)
      let query;
      if (type === "club") {
        query = { name: clubName };
      } else {
        query = { title: clubName };
      }

      const result = await collection.findOne(query);

      if (result) {
        ("Club found and updated");
        await collection.updateOne(query, { $set: { registered: false } });

        res.status(200).json({ message: "Club registration successful!" });
      } else {
        ("Club not found");
        res.status(404).json({ error: "Club not found!" });
      }

      client.close();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
