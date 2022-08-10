import MONGO_PROMISE_WRAP from "./MONGO_SETUP";

export const ADD_CALL = async (uri, db, cl, filter, update, res) => {
  const rest_type = "ADD";
  const response = await MONGO_PROMISE_WRAP(
    uri,
    db,
    cl,
    filter,
    update,
    res,
    rest_type
  );
  return response;
};

export const DELETE_CALL = async () => {};

export const GET_CALL = async () => {};

export const UPDATE_CALL = async () => {};
