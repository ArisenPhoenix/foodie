import FullMenu from "../../oComponents/Home/FullMenu/FullMenu";
import FoodContext from "../../store/food-context";
import { useContext } from "react";
import AuthGuard from "../../Helpers/AuthGuard/AuthGuard";

const Menu = (props) => {
  const foodCtx = useContext(FoodContext);
  const full_menu = [
    foodCtx.breakfast,
    foodCtx.lunch,
    foodCtx.dinner,
    foodCtx.snack,
    foodCtx.dessert,
  ];

  const showMeals = true;
  const showMealType = true;

  // Classes For Meal Module & Below
  const entreeClasses = {};
  const entreeListClasses = { entree: entreeClasses };
  const sideClasses = {};
  const sideListClasses = { side: sideClasses };

  const dishClass = {};
  const headersClasses = {};

  const mealModuleClasses = {
    entrees: entreeListClasses,
    sides: sideListClasses,
    dish: dishClass,
    headers: headersClasses,
    show: { meals: showMeals, mealType: showMealType },
  };

  return (
    <AuthGuard>
      <FullMenu meals={full_menu} mealModuleClasses={mealModuleClasses} />
    </AuthGuard>
  );
};

export default Menu;
