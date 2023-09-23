import { connectToDatabase } from "../../mongodb";
import { ObjectId } from "mongodb"; 

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { postId } = req.body;
      console.log("Received request to like post with postId:", postId);

      const { db } = await connectToDatabase();
      const collection = db.collection("posts");

      const postObjectId = new ObjectId(postId);

      const post = await collection.findOne({ _id: postObjectId });

      if (!post) {
        console.log("Post not found");
        return res.status(404).json({ error: "Post not found" });
      }

      // Increment the likes count
      await collection.updateOne({ _id: postObjectId }, { $inc: { likes: 1 } });

      console.log("Post likes incremented successfully");

      res.status(200).json({ message: "Post likes incremented successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
