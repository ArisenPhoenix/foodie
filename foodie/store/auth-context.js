import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ADD_TOKEN_DATA_TO_STORAGE,
  REMOVE_TOKEN_DATA_FROM_STORAGE,
  RETRIEVE_STORED_TOKEN,
  CALCULATE_REMAINING_TIME,
  UPDATE_STORED_DATA,
  UPDATE_ALL,
  UPDATE_ONE,
  SAVE_LAST_MEAL,
  GET_LAST_MEAL,
  REMOVE_LAST_MEAL,
  UPDATE_LAST_MEAL,
} from "./AUTHCONTEXT/EDIT_LOCAL_STORAGE";
import { FETCH } from "./FOODCONTEXT/FETCH_API";
import css from "./auth-context.module.css";

let logoutTimeout;
let remainingTime;

const AuthContext = createContext({
  token: "",
  userName: "",
  isLoggedIn: false,
  mealData: {},
  ingredients: [],
  lastMeal: {
    save: () => {},
    update: () => {},
    remove: () => {},
    get: () => {},
  },
  lastSite: () => {},
  setMealData: () => {},
  getIngredients: () => {},
  getDbUpdate: () => {},
  updateUserInfo: () => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const router = useRouter();
  let tokenData;
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [mealData, setMealData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [loggingIn, setLoggingIn] = useState(false);
  const userIsLoggedIn = !!token;

  const saveLatest = (mealData, calledBy) => {
    SAVE_LAST_MEAL(mealData, calledBy);
  };

  const updateLatest = (new_meal) => {
    UPDATE_LAST_MEAL(new_meal);
  };

  const getLatest = (calledBy) => {
    const latest = GET_LAST_MEAL(calledBy);
    return latest;
  };

  const updateProfile = (newProfileData) => {
    let updated;
    if (userIsLoggedIn) {
      updated = UPDATE_STORED_DATA(newProfileData);
      setUserInfo({ ...updated.profile });
    }
  };

  const getSite = () => {
    const path = router.pathname;
    const query = router.query;
    const send = { path: path, query: query };
    if (path === "/menu/[meal]/[dish]") {
      return { path: send, subPath: true };
    } else {
      return { path: send, subPath: false };
    }
  };

  const GET_DB_UPDATE = async (option = "", option_location = "") => {
    // console.log("UPDATING DATA BASE...");
    if (userIsLoggedIn) {
      const userId = userInfo.userId;
      // console.log("USER INFO: ", userInfo);
      const r = await FETCH(userId, "/api/get_all");
      console.log("GET DB UPDATE RESPONSE: ", r);
      if (r.displayName) {
        if (option === "") {
          const mealData = {
            fullMenu: r.fullMenu,
            ingredients: r.ingredients,
            weeklyList: r.weeklyList,
          };
          setToken(r.token);
          setUserName(r.profile["User Data"]["User Name"]);
          setUserInfo({ ...r.profile, userId: r._id });
          setMealData(mealData);
          const update_data = UPDATE_ALL(r.profile, mealData);

          // console.log("LOCAL STORAGE UPDATE DATA: ", update_data);
        } else if (option === "profile") {
          setUserInfo(r.profile);
        } else {
          const data = mealData[option];
          setMealData((prev) => {
            return { ...prev, [option]: data };
          });
          const final = UPDATE_ONE(data, option, option_location);
          if (final) {
          }
        }
      }
    }
  };

  useEffect(() => {
    setUserInfo((prev) => {
      return prev;
    });
  }, [userInfo]);

  useEffect(() => {
    tokenData = RETRIEVE_STORED_TOKEN();
    if (tokenData) {
      const initialToken = tokenData.token;
      const initialUserName = tokenData.userName;
      const profile = tokenData.profile;
      const mealData = tokenData.mealData;

      setIngredients(tokenData.mealData.ingredients);
      setToken(initialToken);
      setUserName(initialUserName);
      setUserInfo(profile);
      setMealData(mealData);
    } else {
      // console.log("NO TOKEN DATA WAS THERE TO RETREIVE");
    }
  }, []);

  const logoutHandler = async (function_that_called, time) => {
    setToken(null);
    setUserName(null);
    REMOVE_TOKEN_DATA_FROM_STORAGE();
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
    router.push("/login");
  };

  const loginHandler = (token, userName, expirationTime, profile, mealData) => {
    setLoggingIn(true);
    token && setToken(token);
    userName && setUserName(userName);
    profile && setUserInfo(profile);
    mealData && setMealData({ ...mealData });
    mealData && mealData.ingredients && setIngredients(mealData.ingredients);
    saveLatest({ dish: {}, meal: "" });

    ADD_TOKEN_DATA_TO_STORAGE(
      token,
      userName,
      expirationTime,
      profile,
      mealData
    );

    remainingTime = CALCULATE_REMAINING_TIME(expirationTime);
    setLoggingIn(false);
    router.push("/");
  };

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    remainingTime = CALCULATE_REMAINING_TIME(expirationTime);

    if (remainingTime < 600) {
      clearTimeout(logoutTimeout);

      personalSetTimeout("Use Effect", remainingTime);
      logoutTimeout = setTimeout(logoutDealer, remainingTime);
    }
  }, []);

  const contextValue = {
    token: token,
    userName: userName,
    isLoggedIn: userIsLoggedIn,
    userInfo: userInfo,
    mealData: mealData,
    lastMeal: {
      save: saveLatest,
      update: updateLatest,
      remove: REMOVE_LAST_MEAL,
      get: getLatest,
    },
    ingredients: ingredients,
    loggingIn: loggingIn,
    saveLastSite: getSite,
    getDbUpdate: GET_DB_UPDATE,
    setMealData: setMealData,
    updateUserInfo: updateProfile,
    login: loginHandler,
    logout: logoutHandler,
  };

  const logoutDealer = async (what_called) => {
    logoutHandler();
  };

  const personalSetTimeout = (who, time) => {
    // console.log(
    //   `personalSetTimeout: Function ${who} was called with ${time} seconds left.`
    // );
    logoutTimeout = setTimeout(logoutDealer, time);
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <div className={css.height}>
        {userInfo !== {} ? props.children : <h1>Waiting for user info</h1>}
      </div>
    </AuthContext.Provider>
  );
};

export default AuthContext;
