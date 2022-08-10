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
      return SAVE_USER(collection, filter, update, res, response_type, client);
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
  response_type
) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  await new Promise(async (resolve, reject) => {
    let switchData;
    client.connect(async (err) => {
      if (err) {
        console.log(`There was an error in ${REST_TYPE}.`);
        console.log(err);
        return err;
      }
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
      if (response_type === "return") {
        resolve(switchData);
      }
    });

    client.close();
  });
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
    return await MONGO_CLIENT_CONNECT(
      uri,
      db,
      cl,
      filter,
      update,
      REST_TYPE,
      res,
      response_type
    );
  } catch (err) {
    console.log("Error: Post To Database Failed.");
    console.log(err);
    return err;
  }
};

export default MONGO_PROMISE_WRAP;
