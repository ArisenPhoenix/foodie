import { MongoClient, ServerApiVersion } from "mongodb";

import {
  UPDATE_ONE,
  DELETE_ONE,
  GET_ALL,
  SAVE_ONE,
  SAVE_USER,
  LOGIN_USER,
  FIND_AND_REPLACE,
  UPDATE_ALL,
} from "./MONGO_CALLS";

export const MONGO_COLLECTION = async (client, db, cl) => {
  console.log("CREATING A MONGO COLLECTION CONNECTION");
  const collection = await client.db(db).collection(cl);
  return collection;
};

//  ----------------------------------------------------------
//  ----------------------------------------------------------

export const MONGO_SWITCH = async (
  client,
  db,
  cl,
  filter,
  update,
  REST_TYPE,
  res,
  response_type
) => {
  console.log("MADE IT TO MONGO SWITCH");
  const call = REST_TYPE.toLowerCase();
  const collection = await MONGO_COLLECTION(client, db, cl);
  switch (call) {
    case "add":
      // console.log("______________ADDING_______________");
      return UPDATE_ONE(collection, filter, update, res, response_type, client);
    case "update_one":
      // console.log("______________UPDATING_______________");
      return UPDATE_ONE(collection, filter, update, res, response_type, client);
    case "delete":
      // console.log("______________DELETING_______________");
      return DELETE_ONE(collection, filter, update, res, response_type, client);
    case "get_all":
      // console.log("______________GETTING_______________");
      return GET_ALL(collection, res, response_type, client);
    case "save_one":
      // console.log("______________SAVING_______________");
      return SAVE_ONE(collection, res, response_type, client);
    case "save_user":
      // console.log("______________SAVING USER_______________");
      return SAVE_USER(collection, update, res, response_type, client);
    case "login_user":
      // console.log("______________LOGGING IN USER_______________");
      return LOGIN_USER(collection, filter, update, res, response_type, client);
    case "find_and_replace":
      // console.log("______________REPLACING_______________");
      return FIND_AND_REPLACE(
        collection,
        filter,
        update,
        res,
        response_type,
        client
      );
    case "update_all":
      // console.log("______________UPDATING FRONT END_______________");
      return UPDATE_ALL(collection, filter, update, res, response_type, client);
    default:
      // console.log("______________NOT A PROPER R.E.S.T ACTION_______________");
      return { err: "Error: That was not an appropritate call to the server" };
  }
};

//  ----------------------------------------------------------
//  ----------------------------------------------------------

export const MONGO_CLIENT = async (uri) => {
  console.log("IN MONGO_CLIENT");
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  // console.log("CLIENT IS : ", client);
  console.log("CREATED CLIENT");
  return client;
};

//  ----------------------------------------------------------
//  ----------------------------------------------------------

export const MONGO_CLIENT_CONNECT = async (
  uri,
  db,
  cl,
  filter,
  update,
  REST_TYPE,
  res,
  response_type = "send"
) => {
  console.log("MADE IT TO CLIENT CONNECT");
  try {
    const client = await MONGO_CLIENT(uri);
    let switchData;
    await client.connect((err) => {
      if (err) {
        console.log(`There was an error in ${REST_TYPE}.`);
        console.log(err);
        return res.send({ err: err });
      }
      console.log("THERE WAS NO ERROR CONNECTING");
    });
    switchData = await MONGO_SWITCH(
      client,
      db,
      cl,
      filter,
      update,
      REST_TYPE,
      res,
      response_type
    );
    console.log("MADE IT PAST MONGO_SWITCH");
    if (response_type === "return") {
      return switchData;
    }
    console.log("RESPONSE AFTER CLIENT: ");
    client.close();
    return;
  } catch (err) {
    console.log("ERROR CONNECTING TO MONGO: ", err);
    return res.send({ err: err });
  }
};

//  ----------------------------------------------------------
//  ----------------------------------------------------------

const MONGO_PROMISE_WRAP = async (
  uri,
  db,
  cl,
  filter = {},
  update = {},
  REST_TYPE,
  res,
  response_type = "send",
  callback = null
) => {
  try {
    console.log("TRYING TO SET UP MONGO CLIENT CONNECT");
    const response = await MONGO_CLIENT_CONNECT(
      uri,
      db,
      cl,
      filter,
      update,
      REST_TYPE,
      res,
      response_type
    );
    return response;
  } catch (err) {
    console.log(err);
    return { err: err };
  }
};

export default MONGO_PROMISE_WRAP;
