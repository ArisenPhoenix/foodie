import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { save_error } from "../../Helpers/save_err_logs_to_db";

const add_ingredient = async (req, res) => {
  const filter = {};
  const update = {};

  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;
  const cl = process.env.FOODIE_MONGO_USERS;
  const return_type = process.env.RETURN_TYPE;

  if (req.method === "POST") {
    try {
      const response = await MONGO_PROMISE_WRAP(
        uri,
        db,
        cl,
        filter,
        update,
        "GET_ALL",
        res,
        return_type
      );
    } catch (err) {
      console.log("problem getting menu", err);
      await save_error("/api/get_full_menu", "CATCH (err)", err);
      res.send({ err: err });
    }
  }
};

export default add_ingredient;
