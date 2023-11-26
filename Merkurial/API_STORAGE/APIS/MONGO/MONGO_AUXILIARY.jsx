// import { save_log, save_error } from "../save_err_logs_to_db";

export const HANDLE_RESPONSE = (response, res) => {
  const send = JSON.stringify(response);
  return res.send(send);
};

export const HANDLE_SIGNUP_RESPONSE = (response, res, update) => {
  console.log("HANDLING RESPONSE");
  let send = JSON.stringify({ ...response, ...update });
  return res.send(send);
};

export const HANDLE_LOGIN_RESPONSE = (response, res, update) => {
  const send = { ...response, ...update };
  return res.send(send);
};

export const RETURN_DATA = (response, client) => {
  client.close();
  return response;
};

export const RETURN_OPTIONS = (
  response,
  res,
  response_type,
  HANDLER_FUNC,
  client,
  update
) => {
  // client.close();
  console.log("MADE IT TO RETURN OPTIONS");
  if (response_type === "send") {
    return HANDLER_FUNC(response, res, update);
  } else if (response_type === "return") {
    return RETURN_DATA(response, client);
  } else {
    // save_error(
    //   "MONGO_AUXILIARY: ",
    //   "RETURN_OPTIONS",
    //   `${response_type} is not a valid option for response_type`
    // );
    throw SyntaxError(
      `${response_type} is not a valid option for response_type`
    );
  }
};
