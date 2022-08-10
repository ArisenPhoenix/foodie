import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";

const update_weekly_schedule = async (req, res) => {
  let data = req.body.newSchedule;
  const scheduleId = data.schedule_id;
  const schedule = data.schedule;

  const filter = {
    "weeklyList._id": ObjectId(scheduleId),
  };

  const update = {
    $set: {
      weeklyList: {
        _id: ObjectId(scheduleId),
        meals: schedule.meals,
        ingredients: schedule.ingredients,
      },
    },
  };

  const uri = process.env.FOODIE_URI;
  const db = process.env.FOODIE_MONGO_DB_NAME;
  const cl = process.env.FOODIE_MONGO_USERS;
  const return_type = process.env.RETURN_TYPE;

  if (req.method === "POST") {
    await MONGO_PROMISE_WRAP(
      uri,
      db,
      cl,
      filter,
      update,
      "UPDATE_ONE",
      res,
      return_type
    );
    if (return_type === "send") {
      return res.send(response);
    }
  }
};

export default update_weekly_schedule;
