export const CALCULATE_REMAINING_TIME = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjustedExpirationTime - currentTime;
  return remainingTime;
};

export const REMOVE_1 = (itemName) => {
  try {
    const test = localStorage.getItem(itemName);
    if (typeof test === "object" || typeof test === "string") {
      localStorage.removeItem(itemName);
    } else {
      console.log(`Item (${itemName}) does not exist, cannot remove it.`);
    }
  } catch (err) {
    console.log(`Removal of item: ${itemName} failed.`);
  }
};

export const REMOVE_LIST = (list_items) => {
  list_items.forEach((item, index) => {
    REMOVE_1(item);
  });
};

export const ADD_1 = (itemName, value) => {
  try {
    localStorage.setItem(itemName, value);
  } catch (err) {
    console.log(`ADDITION OF ${itemName} TO LOCAL STORAGE FAILED.`);
  }
};

export const GET_1 = (itemName) => {
  const data = localStorage.getItem(itemName);
  try {
    const send = JSON.parse(data);
    return send;
  } catch (err) {
    try {
      if (typeof data === "string") {
        return data;
      } else {
        return {};
      }
    } catch (err) {
      console.log(`GETTING ITEM ${itemName} Failed`);
      return {};
    }
  }
};

export const UPDATE_1 = (itemName, value) => {
  REMOVE_1(itemName);
  ADD_1(itemName, value);
};

export const ADD_TOKEN_DATA_TO_STORAGE = async (
  token,
  userName,
  expirationTime,
  profile,
  mealData
) => {
  ADD_1("token", token);
  ADD_1("expirationTime", expirationTime);
  ADD_1("userName", userName);
  ADD_1("profile", JSON.stringify(profile));
  ADD_1("mealData", JSON.stringify(mealData));
};

export const REMOVE_TOKEN_DATA_FROM_STORAGE = async () => {
  REMOVE_1("token");
  REMOVE_1("expirationTime");
  REMOVE_1("userName");
  REMOVE_1("profile");
  REMOVE_1("mealData");
};

export const RETRIEVE_STORED_TOKEN = () => {
  let profile = GET_1("profile");
  let mealData = GET_1("mealData");
  let storedToken = GET_1("token");
  let storedUserName = GET_1("userName");
  let storedExpirationTime = GET_1("expirationTime");

  const remainingTime = CALCULATE_REMAINING_TIME(storedExpirationTime);

  if (remainingTime <= 60000) {
    REMOVE_LIST(["token", "expirationTime", "userName", "profile", "mealData"]);
    return null;
  }
  storedToken ? storedToken : "";
  storedUserName ? storedUserName : "";
  remainingTime ? remainingTime : 0;
  profile ? profile : {};
  mealData ? mealData : {};

  return {
    token: storedToken,
    userName: storedUserName,
    duration: remainingTime,
    profile: profile,
    mealData: mealData,
  };
};

export const UPDATE_ONE = (data, option, option_location) => {
  if (data) {
    const fixed = JSON.stringify(data);
    UPDATE_1(option_location, fixed);
    try {
      const new_data = JSON.parse(localStorage.getItem(option_location));
      return new_data;
    } catch (err) {
      console.log(`UPDATING ONE ${option} failed:`);
      return false;
    }
  }
};

export const UPDATE_STORED_DATA = (newProfile, mealData) => {
  const filter = newProfile;
  delete filter.funcs;
  const data = JSON.stringify(newProfile);
  const meals = JSON.stringify(mealData);

  let retreivedProfile = {};

  REMOVE_1("profile");

  ADD_1("profile", data);

  retreivedProfile = GET_1("profile");
  const send = { profile: retreivedProfile };
  return send;
};

export const UPDATE_ALL = (newProfile, mealData) => {
  const data = JSON.stringify(newProfile);
  const meals = JSON.stringify(mealData);

  let retreivedProfile = {};
  let retreivedMeals = {};

  REMOVE_1("profile");
  REMOVE_1("mealData");

  ADD_1("profile", data);
  ADD_1("mealData", meals);

  retreivedProfile = GET_1("profile");
  retreivedMeals = GET_1("mealData");
  const send = { profile: retreivedProfile, mealData: retreivedMeals };
  return send;
};

export const SAVE_LAST_MEAL = (mealData, calledBy) => {
  if (mealData) {
    try {
      const to_save = JSON.stringify(mealData);
      ADD_1("lastMeal", to_save);
    } catch (err) {
      console.log("SAVING LAST MEAL FAILED");
      console.log(err);
    }
  } else {
    console.log("THERE WAS NO LAST MEAL DATA TO SAVE>>>>");
  }
};

export const GET_LAST_MEAL = (calledBy) => {
  // console.log("GET_LAST_MEAL called by: ", calledBy);
  let lastMeal;
  try {
    lastMeal = GET_1("lastMeal");
    return lastMeal;
  } catch (err) {
    console.log("No Last Meal Saved");
  }
};

export const REMOVE_LAST_MEAL = () => {
  REMOVE_1("lastMeal");
};

export const UPDATE_LAST_MEAL = (new_meal) => {
  UPDATE_1("lastMeal", new_meal);
};

export const SAVE_LAST_PAGE = (page) => {
  try {
    const to_save = JSON.stringify(page);
    ADD_1("lastPage", to_save);
  } catch (err) {
    console.log(err);
  }
};

export const GET_LAST_PAGE = () => {
  const lastPage = GET_1("lastPage");
  try {
    if (typeof lastPage === "string") {
      return lastPage;
    } else {
      return "/";
    }
  } catch (err) {
    console.log("GETTING LAST PAGE FAILED");
    return "/";
  }
};

export const UPDATE_LAST_PAGE = (page) => {
  UPDATE_1("lastPage", page);
};
