import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { save_error } from "../../Helpers/save_err_logs_to_db";

const add_dish = async (req, res) => {
  let data = req.body;
  const mealType = data.meal.trim();
  const ingredients = data.data.ingredients;
  const instructions = data.data.instructions;
  const dishName = data.data.dish;
  const dishType = data.dishType;
  const _id = data._id;

  const newIngredients = ingredients.map((ingredient) => {
    return {
      _id: ObjectId(Math.random() * Math.random()),
      ...ingredient,
    };
  });

  const updateData = {
    _id: new ObjectId(
      Math.random() * (Math.random() + Math.random()) * Math.random()
    ),
    dish: dishName,
    ingredients: newIngredients,
    instructions: {
      instructions: instructions,
      _id: ObjectId((Math.random() / Math.random()) * Math.random()),
    },
  };

  const filter_path = `fullMenu.${mealType}.meal`;
  const update_path = `fullMenu.${mealType}.${dishType}`;

  const filter = { _id: ObjectId(_id), [filter_path]: mealType };
  const update = {
    $push: {
      [update_path]: {
        _id: new ObjectId(Math.random() * Math.random() + Math.random()),
        ...updateData,
      },
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
        "ADD",
        res,
        return_type
      );
      if (return_type === "return") {
        return res.send(response);
      }
    } catch (err) {
      console.log("problem adding dish");
      console.log(err);
      await save_error("/api/add_new_dish", "Catch(err)", err);
      res.send(err);
    }
  }
};

export default add_dish;
