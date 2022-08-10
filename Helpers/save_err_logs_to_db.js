import { MongoClient, ServerApiVersion } from "mongodb";

export const save_error = async (api, location, error) => {
  const message = { api: api, location: location, error: error };
  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;
  const cl = "errors";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect(async (err) => {
    if (err) {
      console.log(`There was an error in ${REST_TYPE}.`);
      console.log(err);
    }
    const collection = client.db(db).collection(cl);
    collection
      .insertOne({ ...message })
      .then(async (response) => {
        console.log(response.acknowledged);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const save_log = async (api, location, a_message) => {
  const message = { api: api, location: location, message: a_message };
  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;
  const cl = "e_logs";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect(async (err) => {
    if (err) {
      console.log(`There was an error in ${REST_TYPE}.`);
      console.log(err);
    }
    const collection = client.db(db).collection(cl);
    collection
      .insertOne({ ...message })
      .then(async (response) => {
        console.log(response.acknowledged);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
