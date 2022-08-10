import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

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

      if (return_type === "return") {
        return res.send(response);
      }
    } catch (err) {
      console.log("problem getting weekly schedule");
      console.log(err);
      await save_error("/api/get_weekly_schedule", "CATCH(err)", err);
      res.send({ err: err });
    }
  }
};

export default add_ingredient;
