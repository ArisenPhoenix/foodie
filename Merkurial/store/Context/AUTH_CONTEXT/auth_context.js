import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import USER_CONTEXT from "../USER_CONTEXT/user_context";
import {
  RETREIVE_FROM_LOCAL_STORAGE,
  REMOVE_FROM_LOCAL_STORAGE,
} from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";
import {
  loginUser,
  defaultAuthData,
} from "./helpers";
import { useRouter } from "next/router";


const AUTH_CONTEXT = createContext({
  userid: null,
  first_name: null,
  last_name: null,
  email: null,
  password: null,
  username: null,
  isAdmin: false,
  isUser: false,
  login: (creds) => {},
  logout: () => {},
  update: (creds) => {}
  
});

export const AUTH_CONTEXT_PROVIDER = (props) => {
  const userCtx = useContext(USER_CONTEXT);
  const [userAuth, setUserAuth] = useState(defaultAuthData);
  const router = useRouter();

  useEffect(() => {
    const savedUserData = RETREIVE_FROM_LOCAL_STORAGE(`foodie_last_user`);
    if (savedUserData && savedUserData !== null) {
      const { auth_data, user_data } = savedUserData;
      if (auth_data && auth_data !== null && user_data && user_data !== null) {
        setUserAuth(auth_data);
        userCtx.login(user_data);
      }
    }
  }, []);

  const login = (creds, push="/") => {
    const data = loginUser(creds, setUserAuth, userCtx.login);
    if (data.isLoggedIn || data.isUser) {
      push && router.push(push);
    }

    return data;
  };
  const logout = () => {
    REMOVE_FROM_LOCAL_STORAGE(`foodie_last_user`);
    setUserAuth(defaultAuthData);
    userCtx.logout();
  };


  const contexValue = {
    isAdmin: userAuth.isAdmin,
    isUser: userAuth.isUser,
    userid: userAuth.userid,
    password: userAuth.password,
    login: login,
    logout: logout,
  };

  return (
    <AUTH_CONTEXT.Provider value={contexValue}>
      {props.children}
    </AUTH_CONTEXT.Provider>
  );
};

export default AUTH_CONTEXT;
 