import { createContext, useEffect, useState } from "react";
import {
  REMOVE_FROM_LOCAL_STORAGE,
  RETREIVE_FROM_LOCAL_STORAGE,
} from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";

export const AdminContext = createContext({
  isAdmin: false,
  email: "",
  firstName: "",
  lastName: "",
  pin: "",
  message: "",
  validate: () => {},
  LOGOUT: () => {},
  LOGIN: () => {},
});

const AdminContextProvider = (props) => {
  const defaultState = {
    isAdmin: false,
    email: "",
    firstName: "",
    lastName: "",
    pin: "",
    message: null,
  };
  const [creds, setCredentials] = useState(defaultState);

  const LOGOUT_ADMIN = () => {
    setCredentials(defaultState);
    REMOVE_FROM_LOCAL_STORAGE("admin");
  };

  const GET_CREDENTIALS = async (credentials) => {
    const adminCredentials = await VALIDATE_ADMIN(credentials);
    setCredentials(adminCredentials);
    return adminCredentials;
  };

  const LOGIN = (data) => {
    setCredentials(data);
  };

  const VALIDATE_ADMIN = async (credentials) => {
    const sendData = JSON.stringify(credentials);
    const response = await fetch("/api/admin-sign-in", {
      method: "POST",
      body: sendData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const r = await response.json();
    return r;
  };

  useEffect(() => {
    if (!creds.isAdmin) {
      const credentials = RETREIVE_FROM_LOCAL_STORAGE("admin");
      if (credentials?.isAdmin) {
        setCredentials(credentials);
      }
    }
  }, []);

  const adminContextValue = {
    isAdmin: creds.isAdmin,
    email: creds.email,
    firstName: creds.firstName,
    lastName: creds.lastName,
    pin: creds.pin,
    message: creds.message,
    validate: GET_CREDENTIALS,
    LOGOUT: LOGOUT_ADMIN,
    LOGIN: LOGIN,
  };

  return (
    <AdminContext.Provider value={adminContextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
