import { connectToDatabase } from "../../mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, imageurl } = req.body;

    try {
      const { client, db } = await connectToDatabase();

      const collection = db.collection("users");

      const existingUser = await collection.findOne({
        "email.emailAddress": email[0].emailAddress,
      });

      if (existingUser) {
        ("User found and updated");
        await collection.updateOne(
          { "email.emailAddress": email[0].emailAddress },
          { $set: { name, email, imageurl } }
        );
      } else {
        ("User not found, creating a new user");
        await collection.insertOne({ name, email, imageurl });
      }

      client.close();

      res.status(200).json({ message: "User registration/update successful!" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
