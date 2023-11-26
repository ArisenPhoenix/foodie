  // const logoutHandler = async (function_that_called, time) => {
  //   setToken(null);
  //   setUserName(null);
  //   REMOVE_TOKEN_DATA_FROM_STORAGE();
  //   if (logoutTimeout) {
  //     clearTimeout(logoutTimeout);
  //   }
  //   router.push("/login");
  // };

  // const loginHandler = (token, userName, expirationTime, profile, mealData) => {
  //   setLoggingIn(true);
  //   token && setToken(token);
  //   userName && setUserName(userName);
  //   profile && setUserInfo(profile);
  //   mealData && setMealData({ ...mealData });
  //   mealData && mealData.ingredients && setIngredients(mealData.ingredients);
  //   saveLatest({ dish: {}, meal: "" });

  //   ADD_TOKEN_DATA_TO_STORAGE(
  //     token,
  //     userName,
  //     expirationTime,
  //     profile,
  //     mealData
  //   );

  //   remainingTime = CALCULATE_REMAINING_TIME(expirationTime);
  //   setLoggingIn(false);
  //   router.push("/");
  // };

  // useEffect(() => {
  //   const expirationTime = localStorage.getItem("expirationTime");
  //   remainingTime = CALCULATE_REMAINING_TIME(expirationTime);

  //   if (remainingTime < 600) {
  //     clearTimeout(logoutTimeout);

  //     personalSetTimeout("Use Effect", remainingTime);
  //     logoutTimeout = setTimeout(logoutDealer, remainingTime);
  //   }
  // }, []);


//   useEffect(() => {
//     setUserInfo((prev) => {
//       return prev;
//     });
//   }, [userInfo]);

//   useEffect(() => {
//     tokenData = RETRIEVE_STORED_TOKEN();
//     if (tokenData) {
//       const initialToken = tokenData.token;
//       const initialUserName = tokenData.userName;
//       const profile = tokenData.profile;
//       const mealData = tokenData.mealData;

//       setIngredients(tokenData.mealData.ingredients);
//       setToken(initialToken);
//       setUserName(initialUserName);
//       setUserInfo(profile);
//       setMealData(mealData);
//     } else {
//       // console.log("NO TOKEN DATA WAS THERE TO RETREIVE");
//     }
//   }, []);



// const GET_DB_UPDATE = async (option = "", option_location = "") => {
//     if (userIsLoggedIn) {
//       const userId = userInfo.userId;
//       const r = await FETCH(userId, "/api/get_all");
//       // console.log("GET DB UPDATE RESPONSE: ", r);
//       if (r.displayName) {
//         if (option === "") {
//           const mealData = {
//             fullMenu: r.fullMenu,
//             ingredients: r.ingredients,
//             weeklyList: r.weeklyList,
//           };
//           setToken(r.token);
//           setUserName(r.profile["User Data"]["User Name"]);
//           setUserInfo({ ...r.profile, userId: r._id });
//           setMealData(mealData);
//           UPDATE_ALL(r.profile, mealData);

//         } else if (option === "profile") {
//           setUserInfo(r.profile);
//         } else {
//           const data = mealData[option];
//           setMealData((prev) => {
//             return { ...prev, [option]: data };
//           });
//           const final = UPDATE_ONE(data, option, option_location);
//           if (final) {
//           }
//         }
//       }
//     }
//   };


// const updateProfile = (newProfileData) => {
//     let updated;
//     if (userIsLoggedIn) {
//       updated = UPDATE_STORED_DATA(newProfileData);
//       setUserInfo({ ...updated.profile });
//     }
//   };


// const personalSetTimeout = (who, time) => {
//     logoutTimeout = setTimeout(logoutDealer, time);
//   };


// const logoutDealer = async (what_called) => {
//     logoutHandler();
//   };