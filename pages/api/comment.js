import { connectToDatabase } from "../../mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, text, imageurl, index } = req.body;

    try {
      const { client, db } = await connectToDatabase();

      const collection = db.collection("posts");

      const posts = await collection.find({}).toArray();

      if (index >= 0 && index < posts.length) {
        posts[index].comments.push({ name, imageurl, text });

        await collection.updateOne(
          { _id: posts[index]._id },
          { $set: { comments: posts[index].comments } }
        );

        client.close();

        res.status(200).json({ message: "Comment added successfully!" });
      } else {
        client.close();
        res.status(404).json({ error: "Post not found!" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
