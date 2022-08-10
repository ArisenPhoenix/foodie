import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { ObjectId } from "mongodb";
import { save_error } from "../../Helpers/save_err_logs_to_db";

const update_all = async (req, res) => {
  let data = req.body;
  const userId = ObjectId(data);

  if (req.method === "POST") {
    try {
      const uri = process.env.FOODIE_URI;
      const db = process.env.FOODIE_MONGO_DB_NAME;
      const cl = process.env.FOODIE_MONGO_USERS;

      // MONGO FETCH REQUEST, USES LOCAL ID AND NOT TOKEN FOR COMPARISON BETWEEN BOTH DBS
      // BECAUSE TOKEN IS USED FOR SAVING INTO LOCAL STORAGE.

      const filter = { _id: ObjectId(userId) };
      const update = {};
      const return_type = process.env.RETURN_TYPE;

      await MONGO_PROMISE_WRAP(
        uri,
        db,
        cl,
        filter,
        update,
        "UPDATE_ALL",
        res,
        return_type
      );

      if (return_type === "return") {
        return res.send(response);
      }
    } catch (err) {
      console.log("problem getting everything");
      console.log(err);
      await save_error("api/get_all", "catch(err)", err);
      res.send({ err: err });
    }
  }
};
export default update_all;
