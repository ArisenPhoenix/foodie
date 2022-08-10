import { Fragment, useEffect, useState, useContext } from "react";
import { GENERATE_SCHEDULE } from "./FOODCONTEXT/FOODCONTEXT";
import { FETCH } from "./FOODCONTEXT/FETCH_API";
import { FullSort, ParseObjKeys } from "../Helpers/GeneralPurpose/Objects";
import FoodContext from "./FOODCONTEXT/food-context-context";
import UserContext from "./user-context";
import AuthContext from "./auth-context";
import POST_ADD from "../Helpers/client_to_api_functions/POST_ADD";

export const FoodContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const userData = userCtx["User Data"] ? userCtx["User Data"] : {};
  const cur = userData.Currency;
  const numMainDays =
    userData && userData["Main Meals"] ? Number(userData["Main Meals"]) : 7;
  const numOtherDays =
    userData && userData["Optional Meals"]
      ? Number(userData["Optional Meals"])
      : 3;

  let lastMeal;
  const [currentMeal, setCurrentMeal] = useState(lastMeal ? lastMeal : {});
  // console.log("CURRENT MEAL: ", currentMeal);
  useEffect(() => {
    if (authCtx.isLoggedIn) {
      lastMeal = authCtx.lastMeal.get("FoodCtx");
      // console.log("LAST MEAL: ", lastMeal);
      lastMeal ? setCurrentMeal(lastMeal) : setCurrentMeal({});
    }
  }, [authCtx.isLoggedIn]);

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snack, setSnack] = useState([]);
  const [dessert, setDessert] = useState([]);
  const [weeklyScheduleData, setWeeklyScheduleData] = useState({});
  const [scheduleId, setScheduleId] = useState("");
  const [reload, setReload] = useState(false);
  const [listOfIngredients, setListOfIngredients] = useState([]);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const m = authCtx.mealData ? authCtx.mealData : {};
      if (m.fullMenu) {
        const meals = m.fullMenu;
        if (meals.breakfast) {
          setBreakfast(meals.breakfast);
        }
        if (meals.lunch) {
          setLunch(meals.lunch);
        }
        if (meals.dinner) {
          setDinner(meals.dinner);
        }
        if (meals.snack) {
          setSnack(meals.snack);
        }
        if (meals.dessert) {
          setDessert(meals.dessert);
        }
      }

      setScheduleId(authCtx.userInfo.userId);
      setWeeklyScheduleData(m.weeklyList);
      setListOfIngredients(
        authCtx.ingredients
          ? authCtx.ingredients
          : m.ingredients
          ? m.ingredients
          : []
      );
      lastMeal = authCtx.lastMeal.get("FoodCtx 2");
      setCurrentMeal(lastMeal);
    }
  }, [authCtx.isLoggedIn, authCtx.mealData, authCtx.mealData.ingredients]);

  const updateReload = (bool) => {
    setReload(bool);
  };

  const add_new_dish = async (data) => {
    const f = { ...data, _id: scheduleId };
    const r = await POST_ADD(f);
    return r;
  };

  const addNewIngredient = async (newIngredient) => {
    const d = {
      name: newIngredient.ingredient,
      price: newIngredient.price,
      userId: scheduleId,
    };
    const r = await FETCH(d, "/api/add_ingredient");
    console.log("Add New Ingredient Response: ", r);
    return r;
  };

  const updateIngredient = async (newIngredient) => {
    const d = {
      ...newIngredient,
      userId: scheduleId,
    };

    const r = await FETCH(d, "/api/update_ingredient");
    console.log("Update Ingredient Response: ", r);
    return r;
  };
  const deleteIngredient = async (oldIngredient) => {
    const d = {
      ...oldIngredient,
      userId: scheduleId,
    };
    const r = await FETCH(d, "/api/delete_ingredient");
    console.log("Delete Ingredient Response: ", r);
  };

  const updateDish = async (data) => {
    const d = { ...data, id: scheduleId };
    const r = await FETCH(d, "/api/update_dish");
    console.log("UPDATE DISH: ", r);
    return r;
  };

  const deleteDish = async (data) => {
    console.log("DELETE DISH DATA START DATA: ", data);

    const d = {
      ...data,
      _id: data.id,
      userId: scheduleId,
    };

    const r = await FETCH(d, "/api/delete_dish");
    console.log("deleteDish Response: ", r);
  };

  const update_weekly_schedule_fetch = async (schedule) => {
    const d = {
      previousId: schedule.schedule_id,
      newSchedule: schedule,
      userId: scheduleId,
    };
    const r = await FETCH(d, "/api/update_weekly_schedule");
    return r;
  };

  const UPDATE_WEEKLY_SCHEDULE = async () => {
    const newSchedule = GENERATE_SCHEDULE(
      fullMeals,
      otherMeals,
      numMainDays,
      numOtherDays
    );

    console.log("NEW SCHEDULE: ", newSchedule);

    try {
      const response = await update_weekly_schedule_fetch({
        schedule: { ...newSchedule },
        user_id: scheduleId,
        schedule_id: authCtx.mealData.weeklyList._id,
      });

      if (response) {
        setWeeklyScheduleData(newSchedule);
        console.log(response);
      }
      setReload(false);
      authCtx.getDbUpdate();
      return response;
    } catch (err) {
      console.log("There was an error sending updated info");
      console.log(err);
      return err;
    }
  };

  // separate fullMeals and otherMeals so that they can be used easier.

  const fullMeals =
    breakfast !== undefined && breakfast !== "undefined"
      ? [breakfast, lunch, dinner]
      : [null];

  const otherMeals =
    snack !== undefined && snack !== "undefined" ? [snack, dessert] : [null];

  // Separating Main Meals for Weekly Schedule and others
  const mainMealsList = ParseObjKeys(weeklyScheduleData, ["meals", "main"]);
  const otherMealsList = ParseObjKeys(weeklyScheduleData, ["meals", "other"]);

  // Separating the ingredients from the weekly schedule
  //  so they can be reay for the grocery list
  let mainMealsIngredients = FullSort(
    weeklyScheduleData,
    ["ingredients", "main"],
    ["ingredient"]
  );

  let otherMealsIngredients = FullSort(
    weeklyScheduleData,
    ["ingredients", "other"],
    ["ingredient"]
  );

  const hasScheduleIngredients =
    mainMealsIngredients.length > 0 || otherMealsIngredients.length > 0;

  const contextValue = {
    // MEALS BY MEAL FOR FULL MENU AND MEALS
    breakfast: breakfast,
    lunch: lunch,
    dinner: dinner,
    snack: snack,
    dessert: dessert,

    // MEALS BY TYPE FOR SOMETHING ELSE ???
    mainMeals: {
      list: mainMealsList,
      ingredients: mainMealsIngredients,
    },

    otherMeals: {
      list: otherMealsList,
      ingredients: otherMealsIngredients,
    },

    // OTHER NECESSARY DATA
    weeklySchedule: weeklyScheduleData,
    scheduleId: scheduleId,
    hasScheduleIngredients: hasScheduleIngredients,
    reload: reload,
    currentMeal: typeof currentMeal === "undefined" ? {} : currentMeal,
    allIngredients: listOfIngredients,
    currency: cur,
    setCurrentMeal: setCurrentMeal,
    setReload: updateReload,
    getNew: UPDATE_WEEKLY_SCHEDULE,
    addNewDish: add_new_dish,
    updateDish: updateDish,
    deleteDish: deleteDish,
    addNewIngredient: addNewIngredient,
    updateIngredient: updateIngredient,
    deleteIngredient: deleteIngredient,
    // USED FOR UPDATING ON THE FLY WITHOUT MAKING A CALL TO THE SERVER
    // NOT BEST PRACTICE BUT THE SERVER UPDATES WITHOUT PROBLEMS
    // AND THE CHANGE CAN BE SEEN IMMEDIATELY WITHOUT UPDATING
    setBreakfast: setBreakfast,
    setLunch: setLunch,
    setDinner: setDinner,
    setSnack: setSnack,
    setDessert: setDessert,
  };

  const dataCheck = {
    breakfast: contextValue.breakfast,
    lunch: contextValue.lunch,
    dinner: contextValue.dinner,
    snack: contextValue.snack,
    dessert: contextValue.dessert,
    hasScheduleIngredients: hasScheduleIngredients,
  };

  return (
    <FoodContext.Provider value={contextValue}>
      <Fragment>{props.children}</Fragment>
    </FoodContext.Provider>
  );
};

export default FoodContext;
