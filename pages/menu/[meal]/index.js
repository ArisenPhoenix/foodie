import { useRouter } from "next/router";
import Meal from "../../../oComponents/Home/MealList/Meal/Meal";
import FoodContext from "../../../store/food-context";
import { useContext } from "react";
import AuthGuard from "../../../Helpers/AuthGuard/AuthGuard";
import css from "./meal.module.css";

const MealPage = (props) => {
  const router = useRouter();
  const foodCtx = useContext(FoodContext);
  const menu = [
    foodCtx.breakfast,
    foodCtx.lunch,
    foodCtx.dinner,
    foodCtx.snack,
    foodCtx.dessert,
  ];
  let currentMeal = router.query.meal;
  const meal = router.query.meal;

  let final = menu.filter((meals) => {
    return meals.meal === meal;
  });

  final = final[0];

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

  const deleteDish = foodCtx.deleteDish;

  const setCurrentMeal = foodCtx.setCurrentMeal;

  return (
    <AuthGuard>
      <Meal
        setCurrentMeal={setCurrentMeal}
        entrees={final && typeof final.entrees === "object" && final.entrees}
        sides={final && typeof final.sides === "object" && final.sides}
        key={Math.random()}
        meal={final && final.meal ? final.meal : currentMeal}
        mealModuleClasses={mealModuleClasses}
        deleteDish={deleteDish}
        cur={props.cur}
      />
    </AuthGuard>
  );
};

export default MealPage;
