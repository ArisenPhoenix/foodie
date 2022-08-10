import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { save_error } from "../../Helpers/save_err_logs_to_db";

const update_dish = async (req, res) => {
  let data = req.body;
  let _id = data._id;
  const userId = data.userId;
  const name = data.name;
  const price = data.price;

  if (_id === "undefined") {
    _id = ObjectId(Math.random() + Math.random() / Math.random());
  }

  const update_doc = {
    name: name,
    price: price,
  };

  const filter_path = "ingredients._id";
  const update_path = "ingredients.$.ingredient";

  const filter = { _id: ObjectId(userId), [filter_path]: ObjectId(_id) };
  const update = {
    $set: {
      [update_path]: { ...update_doc },
    },
  };

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
        "UPDATE_ONE",
        res,
        return_type
      );

      if (return_type === "return") {
        return res.send(response);
      }
    } catch (err) {
      console.log("problem updating ingredient");
      console.log(err);
      await save_error("/api/update_ingredient", "CATCH(err)", err);
      res.send({ err: err });
    }
  }
};

export default update_dish;
