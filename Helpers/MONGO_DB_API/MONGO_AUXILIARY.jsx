import { save_log, save_error } from "../save_err_logs_to_db";

export const HANDLE_RESPONSE = (response, res) => {
  save_log("MONGO AUXILIARY", ": HANDLE_RESPONSE", response);
  const send = JSON.stringify(response);
  return res.send(send);
};

export const HANDLE_SIGNUP_RESPONSE = (response, res, filter, update) => {
  save_log("MONGO AUXILIARY", ": HANDLE_SIGNUP_RESPONSE", response);
  let send = JSON.stringify({ ...response, ...update });
  save_log("MONGO AUXILIARY", ": HANDLE_SIGNUP: SEND DATA", send);
  return res.send(send);
};

export const HANDLE_LOGIN_RESPONSE = (response, res, filter, update) => {
  save_log("MONGO AUXILIARY", ": HANDLE_LOGIN_RESPONSE", response);
  const send = { ...response, ...update };
  save_log("MONGO AUXILIARY", ": HANDLE_LOGIN: SEND DATA", send);
  res.send(send);
  return;
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
  client.close();
  if (response_type === "send") {
    return HANDLER_FUNC(response, res);
  } else if (response_type === "return") {
    return RETURN_DATA(response, client);
  } else {
    save_error(
      "MONGO_AUXILIARY: ",
      "RETURN_OPTIONS",
      `${response_type} is not a valid option for response_type`
    );
    throw SyntaxError(
      `${response_type} is not a valid option for response_type`
    );
  }
};
