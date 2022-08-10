import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const save_schedule = async (req, res) => {
  let data = req.body;
  const ingredient = data.name;
  const price = Number(data.price);
  const listId = data.listId;
  const userId = data.userId;

  // console.log("USERID: ", userId);
  // console.log("LISTID: ", listId);

  const update_path = "weeklyMenu.ingredients";
  const update_data = {
    _id: new ObjectId(Math.random() + Math.random() / Math.random()),
    ingredient: {
      price: price,
      name: ingredient,
    },
  };
  const filter_path = `weeklyMenu._id`;
  const filter = { _id: ObjectId(userId), [filter_path]: ObjectId(listId) };
  const update = {
    $push: { [update_path]: { ...update_data } },
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
        "SAVE_ONE",
        res,
        return_type
      );

      if (return_type === "return") {
        return res.send(response);
      }
    } catch (err) {
      console.log("problem saving schedule", err);
      await save_error("/api/save_schedule", "Catch (err)", err);
      res.send({ err: err });
    }
  }
};

export default save_schedule;
