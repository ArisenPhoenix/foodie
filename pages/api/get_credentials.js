import { save_error, save_log } from "../../Helpers/save_err_logs_to_db";

const get_credentials = async (req, res) => {
  const api = "/api/get_credentials";
  let data = req.body;

  try {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    const endpoint = process.env.FOODIE_LOGIN_URI;

    const options = {
      method: "POST",
      body: JSON.stringify({
        displayName: data.displayName === "" ? data.fName : data.displayName,
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }),
    };

    // actual fetch request to firebase Auth.
    const response = await fetch(endpoint, options, headers).then(
      (final_data) => {
        const save_data = final_data;
        save_log(api, "FETCH RESPONSE", final_data);
        return final_data;
      }
    );

    const body = await response.json();

    if (body.error) {
      await save_error(api, "BODY CHECK", body.error);
      return res.send(JSON.stringify({ err: "body had an error", data: body }));
    }

    const send = JSON.stringify(body);
    res.send(send);
  } catch (err) {
    console.log("ERROR GETTING CREDENTIALS: ", err);
    await save_error(api, "Catch (err)", err);
    res.send({ err: err });
  }
};

export default get_credentials;
