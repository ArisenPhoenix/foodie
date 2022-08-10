import ax from "axios";

export const FETCH_API = async (database_data, api_path) => {
  const stringified = JSON.stringify(database_data);
  try {
    const retreival = await fetch(api_path, {
      body: stringified,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      const sendData = await retreival.json();
      return sendData;
    } catch (err) {
      console.log(err);
      console.log("RESPONSE BEFORE JSON TRY WAS: ", retreival);
      return err;
    }
  } catch (err) {
    console.log("FETCH API IS WHERE THE ERROR STARTS");
    return err;
  }
};

export const FETCH = async (send_data, api_path, callback = null) => {
  try {
    const r = await FETCH_API(send_data, api_path);
    if (callback !== null) {
      callback();
    }
    // console.log("RESPONSE: ", r);
    return r;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const SIGN_LOG_IN_FETCH = async (
  send_data,
  api_path,
  callback = null
) => {
  try {
    const r = await FETCH_API(send_data, api_path);
    if (callback !== null) {
      callback();
    }
    return r;
  } catch (err) {
    console.log("SIGN IN LOGIN FETCH API IS WHERE THE ERROR STARTS");
    console.log(err);
    return err;
  }
};

export const AXIOS_POST = async (sendData, api_path) => {
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      method: "POST",
    },
  };
  const response = await ax
    .post(api_path, sendData, headers)
    .then((result) => result.data);
  return response;
};
