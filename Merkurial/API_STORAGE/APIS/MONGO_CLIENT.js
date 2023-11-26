import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const MONGO_CLIENT = async (db, collection) => {
  // locationCalled & console.log("LOCATION CALLED: ", locationCalled);
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const collectionData = client.db(db).collection(collection);
  return { collection: collectionData, client: client, ObjectId: ObjectId };
};

export default MONGO_CLIENT;
