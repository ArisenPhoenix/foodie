import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { save_error } from "../../Helpers/save_err_logs_to_db";

const add_ingredient = async (req, res) => {
  let data = req.body;
  const ingredient = data.name;
  const price = Number(data.price);
  const userId = data.userId;
  const newId = new ObjectId(Math.random() + Math.random());
  const _id = newId.toString();

  const update_data = {
    _id: _id,
    ingredient: {
      price: price,
      name: ingredient,
    },
  };

  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;

  // Specifying return in return_type, gives the variable a value, otherwise the response
  // is automatically sent to the client

  const return_type = process.env.RETURN_TYPE;
  if (req.method === "POST") {
    try {
      const update_path = "ingredients";
      const cl = process.env.FOODIE_MONGO_USERS;
      const filter = { _id: ObjectId(userId) };
      const update = { $push: { [update_path]: { ...update_data } } };

      const response = await MONGO_PROMISE_WRAP(
        uri,
        db,
        cl,
        filter,
        update,
        "ADD",
        res,
        return_type
      );
      if (return_type === "return") {
        res.send(response);
      }
    } catch (err) {
      console.log("problem adding ingredient");
      console.log(err);
      await save_error("/api/add_ingredient", "Catch(err)", err);
      res.send(err);
    }
  }
};

export default add_ingredient;
