import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Meal from "../../../oComponents/MenuItemDisplays/MealDisplay/MealList/Meal/Meal";
import FoodContext from "../../../store/food-context";
import SiteContext from "../../../store/site_context";
import { useContext } from "react";
import css from "./meal.module.css";
import AUTH_GUARD from "../../../Merkurial/Auth/AUTH";

const MealPage = (props) => {
  const router = useRouter();
  const foodCtx = useContext(FoodContext);
  const siteCtx = useContext(SiteContext)
  const mealName = props.mealName ? props.mealName : router.query.meal;
  const allMealsDishes = foodCtx[mealName]

  useEffect(() => {
    siteCtx.lastMeal.save(mealName)
    siteCtx.lastPage.save(router.asPath)
  }, [router.asPath, mealName])
 
  const [entrees, setEntrees] = useState([])
  const [sides, setSides] = useState([])
  

  useEffect(() => {
    if (allMealsDishes){
      const entrees = allMealsDishes.filter((dish, dishIndex) => {
        return dish.is_entree == true
      })
      setEntrees(entrees)
      const sides = allMealsDishes.filter((dish, dishIndex) => {
        return dish.is_entree == false
      })
      setSides(sides)
    }
  }, [allMealsDishes])

  const showMeals = true;
  const showMealType = true;
  const entreeClasses = css.entrees;
  const entreeListClasses = { entree: entreeClasses };
  const sideClasses = css.sides;
  const sideListClasses = { side: sideClasses };

  const dishClass = css.dishes;
  const headersClasses = css.headersClasses;

  const mealModuleClasses = {
    entrees: entreeListClasses,
    sides: sideListClasses,
    dish: dishClass,
    headers: headersClasses,
    show: { meals: showMeals, mealType: showMealType },
  };

  return (
    <AUTH_GUARD needsUser={true} needsLoggedIn={true}>
      <Meal
        setCurrentMeal={foodCtx.setCurrentMeal} 
        entrees={entrees}
        sides={sides}
        key={`Meal | ${mealName}`}
        mealName={mealName}
        mealModuleClasses={mealModuleClasses}
        cur={props.cur}
      />
    </AUTH_GUARD>
  );
};

export default MealPage;
 