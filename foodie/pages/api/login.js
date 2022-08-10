import { save_error } from "../../Helpers/save_err_logs_to_db";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const handleLogin = async (req, res) => {
  const api = "/api/login";
  let data = req.body;

  if (req.method === "POST") {
    try {
      const uri = process.env.FOODIE_URI;
      const db = process.env.FOODIE_MONGO_DB_NAME;
      const cl = process.env.FOODIE_MONGO_USERS;

      // MONGO FETCH REQUEST, USES LOCAL ID AND NOT TOKEN FOR COMPARISON BETWEEN BOTH DBS
      // BECAUSE TOKEN IS USED FOR SAVING INTO LOCAL STORAGE.

      const filter = { "profile.localId": data.localId };
      const update = {
        expiresIn: data.expiresIn,
        token: data.idToken,
      };

      const return_type = process.env.RETURN_TYPE;

      await MONGO_PROMISE_WRAP(
        uri,
        db,
        cl,
        filter,
        update,
        "LOGIN_USER",
        res,
        return_type
      );
    } catch (err) {
      console.log("problem logging in", err);
      save_error(api, "BOTTOM CATCH", err);
      res.send({ err: err });
    }
  }
};
export default handleLogin;
