// import AuthContext from "../../store/auth-context";
// import { useRouter } from "next/router";
// import { useEffect, useContext } from "react";
// import FoodContext from "../../store/food-context";

// const AuthGuard = (props) => {
//   const foodCtx = useContext(FoodContext);
//   const router = useRouter();
//   const authCtx = useContext(AuthContext);
//   const lastMeal = authCtx.lastMeal;
//   const currentPage = authCtx.saveLastSite;
//   useEffect(() => {
//     console.log("IS LOGGED IN: ", authCtx.isLoggedIn);
//     const pageData = currentPage();
//     const query = pageData.path.query;

//     if (pageData.subPath) {
//       if (foodCtx.currentMeal && !foodCtx.currentMeal.dish) {
//       } else {
//         lastMeal.save({ meal: query.meal, dish: props.currentMeal });
//       }
//     }

//     if (!authCtx.isLoggedIn) {
//       router.push("/login");
//     }
//   }, [authCtx.isLoggedIn]);

//   if (authCtx.isLoggedIn) {
//     return props.children;
//   }
// };
// export default AuthGuard;

import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import FoodContext from "../../store/food-context";
import {
  SAVE_LAST_PAGE,
  GET_LAST_PAGE,
  UPDATE_LAST_PAGE,
  SAVE_LAST_MEAL,
  GET_LAST_MEAL,
} from "../../store/AUTHCONTEXT/EDIT_LOCAL_STORAGE";

const AuthGuard = (props) => {
  let timer;
  const [count, setCount] = useState(0);
  const foodCtx = useContext(FoodContext);
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const lastMeal = authCtx.lastMeal;
  const currentPage = authCtx.saveLastSite;

  useEffect(() => {
    const pageData = currentPage();
    // console.log("PAGE DATA: ", pageData);

    const query = pageData.path.query;
    // console.log("QUERY: ", query);

    const lastPage = GET_LAST_PAGE();
    // console.log("LAST PAGE: ", lastPage);

    if (lastPage) {
      if (pageData.path.path !== "/login") {
        UPDATE_LAST_PAGE(router.asPath);
      }
    } else {
      if (pageData.path.path !== "/login") {
        SAVE_LAST_PAGE(router.asPath);
      }
    }

    if (pageData.subPath) {
      if (!foodCtx.currentMeal.dish) {
        // console.log("NOT GETTING LAST MEAL");
        const latest = GET_LAST_MEAL("AUTH GUARD 79");
        // console.log("LATEST MEAL WAS: ", latest);
        foodCtx.setCurrentMeal(latest);
      }
    }

    if (count === 3) {
      router.push("/login");
    }

    if (!authCtx.isLoggedIn) {
      timer = setTimeout(() => {
        setCount((prev) => prev + 1);
      }, 10);
    }

    if (authCtx.isLoggedIn) {
      setCount(0);
      return () => {
        clearTimeout(timer), props.children;
      };
    }
  }, [authCtx.isLoggedIn, count]);

  if (authCtx.isLoggedIn) {
    return props.children;
  } else {
    return <h1>...</h1>;
  }
};
export default AuthGuard;
