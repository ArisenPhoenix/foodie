import { REMOVE_FROM_LOCAL_STORAGE } from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";
import { defaultUserData, defaultAuthData } from "../AUTH_CONTEXT/helpers";

export const logoutUser = (setLoggingOut, setUserData, setAuthData) => {
  setLoggingOut(true);
  setUserData(defaultUserData);
  // setAuthData(defaultAuthData);
};

export const removeUserDataFromStorage = () => {
  // REMOVE_FROM_LOCAL_STORAGE("auth");
  // REMOVE_FROM_LOCAL_STORAGE("userData");
};

export const CHECK_LOGIN_INFO = (data) => {
  if (!data) {
    return false;
  }
  const o = {
    userId: data.userId,
    isAdmin: data.isAdmin,
    isUser: data.isUser,
    userName: data.userName,
    first_name: data.first_name,
    last_name: data.last_name,
    days_for_schedule: data.days_for_schedule
  };

  return o;
};

export const SET_USER_INFO = (res, setUserData, setAuthData) => {
  if (res.ok) {
    const data = res.response.rows[0];
    const isLoginValid = CHECK_LOGIN_INFO(data);
    if (isLoginValid) {
      setUserData(data);
      setAuthData(isLoginValid);
    }

    return isLoginValid;
  }
};
