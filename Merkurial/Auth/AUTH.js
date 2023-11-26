// import React from "react";
import { useContext, useEffect, useState } from "react";
import AUTH_CONTEXT from "../store/Context/AUTH_CONTEXT/auth_context";
import { useRouter } from "next/router";
import LoadingScreen from "../Components/UI/LoadingScreen/LoadingScreen"
import { RETREIVE_FROM_LOCAL_STORAGE } from "Merkurial/API_STORAGE/STORAGE/HANDLE_STORAGE";


const AUTH_GUARD = (props) => {
  const [canGo, setCanGo] = useState(false);
  const router = useRouter();
  const authCtx = useContext(AUTH_CONTEXT)
  const { needsAdmin, needsLoggedIn, needsUser } = props;
  let {isAdmin, isLoggedIn, isUser} = authCtx

  

  useEffect(() => {
    // console.log("AUTH GUARD AUTH CTX: ", authCtx)
    if (!isAdmin && !isLoggedIn && !isUser){
      const all_data = RETREIVE_FROM_LOCAL_STORAGE(`foodie_last_user`)
      // console.log("AUTH GUARD: ", all_data)
      if (all_data){
          const {auth_data, user_data} = all_data
          // let {isAdmin, isLoggedIn, isUser} = auth_data
          isAdmin = auth_data.isAdmin
          isLoggedIn = auth_data.isLoggedIn
          isUser = auth_data.isUser
          authCtx.login({...auth_data, ...user_data})
      } 
    }
    
    switch (true) { 
      case isUser && !needsUser:
        // console.log("isUser && !needsUser")
        setCanGo(true);
        break;

      case needsAdmin && isAdmin:
        // console.log("needsAdmin && isAdmin")
        setCanGo(true)
        break;

      case needsUser && isUser:
        // console.log("needsUser && isUser")
        setCanGo(true)
        break;

      case needsLoggedIn && isLoggedIn:
        // console.log("needsLoggedIn && isLoggedIn")
        setCanGo(true)
        break;

      case !needsAdmin && !needsUser && !needsLoggedIn:
        // console.log("!needsAdmin && !needsUser && !needsLoggedIn")
        setCanGo(true)
        break;

      default:
        // console.log("default")
        router.push("/login");
        break;
    }
  }, []);

  if (canGo) {
    return props.children;
  } else {
    return <LoadingScreen />;
  }
  // return props.children
};

export default AUTH_GUARD;
