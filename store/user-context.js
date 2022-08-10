import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "./auth-context";
import { FETCH } from "./FOODCONTEXT/FETCH_API";

const UserContext = createContext({
  "User Data": {
    "User Name": "",
    "First Name": "",
    "Last Name": "",
    "Main Meals": "",
    "Optional Meals": "",
    Currency: "",
  },
  "Personal Data": {
    address: "",
    sex: "",
    gender: "",
  },

  "Regional Information": {
    country: "",
    currency: "",
  },
  "Theme Options": {
    theme: "",
  },
  others: {
    funcs: {
      updateUserInfo: () => {},
    },
    _id: "",
  },
});

export const UserContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(authCtx.userInfo);

  const updateProfile = async () => {
    delete userInfo.others;
    const d = {
      ...userInfo,
    };
    const r = await FETCH(d, "/api/update_profile");
    console.log("UPDATE USER RESPONSE: ", r);
  };

  const update = () => {
    updateProfile();
  };

  useEffect(() => {
    setUserInfo(authCtx.userInfo);
  }, [authCtx.userInfo]);

  let contextValue =
    userInfo && userInfo["User Data"]
      ? {
          ...userInfo,
          others: {
            funcs: {
              updateUserInfo: authCtx.updateUserInfo,
              update: update,
            },
          },
        }
      : {};

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
