import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://Som:0Br6xNijDmkKRQLm@edumon.vfsmdeq.mongodb.net/?retryWrites=true&w=majority",
    {
      retryWrites: true,
      w: "majority",
      dbName: "EduMon",
    }
  );
  const db = client.db();

  return { client, db };
}
