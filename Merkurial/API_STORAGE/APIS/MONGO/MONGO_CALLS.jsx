import {
  HANDLE_RESPONSE,
  HANDLE_SIGNUP_RESPONSE,
  HANDLE_LOGIN_RESPONSE,
  RETURN_OPTIONS,
} from "./MONGO_AUXILIARY";

export const UPDATE_ONE = async (
  collection,
  filter,
  update,
  res,
  response_type,
  client
) => {
  const response = await collection
    .updateOne({ ...filter }, { ...update })
    .then(async (response) => {
      return RETURN_OPTIONS(
        response,
        res,
        response_type,
        HANDLE_RESPONSE,
        client
      );
    });
  return response;
};

export const DELETE_ONE = async (
  collection,
  filter,
  update,
  res,
  response_type,
  client
) => {
  const response = collection
    .updateOne({ ...filter }, { ...update })
    .then(async (response) => {
      return RETURN_OPTIONS(
        response,
        res,
        response_type,
        HANDLE_RESPONSE,
        client
      );
    });
  return response;
};

export const GET_ALL = async (collection, res, response_type, client) => {
  const response = collection.find({}).toArray(async (err, results) => {
    if (err) {
      res.send(err);
    }
    const result = results[0];
    return RETURN_OPTIONS(result, res, response_type, HANDLE_RESPONSE, client);
  });
  return response;
};

export const SAVE_ONE = async (
  collection,
  filter,
  update,
  res,
  response_type,
  client
) => {
  const response = collection
    .insertOne({ ...filter }, { ...update })
    .then(async (response) => {
      return RETURN_OPTIONS(
        response,
        res,
        response_type,
        HANDLE_RESPONSE,
        client
      );
    });
  return response;
};

export const SAVE_USER = async (
  collection,
  update,
  res,
  response_type,
  client
) => {
  console.log("MADE IT TO SAVE_USER");
  const response = collection
    .insertOne({ ...update })
    .then(async (response) => {
      // const full_update = { ...filter, ...update };
      return RETURN_OPTIONS(
        response,
        res,
        response_type,
        HANDLE_SIGNUP_RESPONSE,
        client
      );
    });
  return response;
};

export const LOGIN_USER = async (
  collection,
  filter,
  update,
  res,
  response_type,
  client
) => {
  const response = collection.findOne({ ...filter }).then(async (response) => {
    const send_back_data = { ...response, ...update };
    return RETURN_OPTIONS(
      send_back_data,
      res,
      response_type,
      HANDLE_LOGIN_RESPONSE,
      client,
      update
    );
  });
  return response;
};

export const UPDATE_USER = async (
  collection,
  filter,
  update,
  res,
  response_type,
  client
) => {
  const response = collection
    .findOne({ ...filter }, { ...update })
    .then(async (response) => {
      return RETURN_OPTIONS(
        response,
        res,
        response_type,
        HANDLE_RESPONSE,
        client
      );
    });
  return response;
};

export const UPDATE_ALL = async (
  collection,
  filter,
  update,
  res,
  response_type,
  client
) => {
  const response = collection.findOne({ ...filter }).then(async (response) => {
    return RETURN_OPTIONS(
      response,
      res,
      response_type,
      HANDLE_RESPONSE,
      client
    );
  });
  return response;
};

export const FIND_AND_REPLACE = async (
  collection,
  filter,
  update,
  res,
  response_type,
  client
) => {
  const response = collection
    .findOneAndReplace({ ...filter }, { ...update })
    .then(async (response) => {
      return RETURN_OPTIONS(
        response,
        res,
        response_type,
        HANDLE_RESPONSE,
        client
      );
    });
  return response;
};
