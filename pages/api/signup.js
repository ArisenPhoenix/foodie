import { ObjectId } from "mongodb";
import MONGO_PROMISE_WRAP from "../../Helpers/MONGO_DB_API/MONGO_SETUP";
import { EmptyMenu, WeeklySchedule } from "../../Dummy_Data_Full/EmptyMenu";
import { save_error } from "../../Helpers/save_err_logs_to_db";

const handleSignup = async (req, res) => {
  let data = req.body;

  if (req.method === "POST") {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const endpoint = process.env.FOODIE_SIGNUP_URI;

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
      const response = await fetch(endpoint, options, headers).then((data) => {
        return data;
      });

      const body = await response.json();

      if (body.error) {
        return res.send(body);
      }

      const uri = process.env.FOODIE_URI;
      const db = process.env.FOODIE_MONGO_DB_NAME;
      const cl = process.env.FOODIE_MONGO_USERS;

      // MONGO FETCH REQUEST, USES LOCAL ID AND NOT TOKEN FOR COMPARISON BETWEEN BOTH DBS
      // BECAUSE TOKEN IS USED FOR SAVING INTO LOCAL STORAGE.

      // Profile instead of Filter adds the additional information needed for signup in this special case
      const filter = {};
      const _id = ObjectId((Math.random * 1000) / Math.random());

      const profile = {
        "User Data": {
          "User Name": body.displayName,
          "First Name": data.fName,
          "Last Name": data.lName,
          "Main Meals": "7",
          "Optional Meals": "3",
          Currency: "฿",
          Email: body.email,
        },
        "Personal Data": {
          address: "",
          sex: "",
          gender: "",
        },

        "Regional Information": {
          country: "",
          currency: "$",
        },
        "Theme Options": {
          theme: "",
        },
      };

      const update = {
        localId: body.localId,
        token: body.idToken,
        displayName: body.displayName,
        email: body.email,
        profile: {
          ...profile,
          _id: ObjectId(Math.random() + Math.random() / Math.random()),
          userId: _id,
          localId: body.localId,
        },
        fullMenu: EmptyMenu,
        ingredients: [],
        weeklyList: { ...WeeklySchedule },
      };

      const return_type = process.env.RETURN_TYPE;
      const mongo_response = await MONGO_PROMISE_WRAP(
        uri,
        db,
        cl,
        filter,
        update,
        "SAVE_USER",
        res,
        return_type
      );

      if (return_type === "return") {
        return res.send(mongo_response);
      }
    } catch (err) {
      console.log("problem signing up");
      console.log(err);
      await save_error("/api/signup", "CATCH(err)", err);
      res.send({ err: err });
    }
  }
};
export default handleSignup;
