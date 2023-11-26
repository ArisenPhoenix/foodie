import FullMenu from "../../oComponents/Home/FullMenu/FullMenu";
import FoodContext from "../../store/food-context";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";
import SiteContext from "../../store/site_context";

const Menu = (props) => {
  const foodCtx = useContext(FoodContext);
  const siteCtx = useContext(SiteContext)

  const router = useRouter()

  useEffect(() => {
    siteCtx.lastPage.save(router.pathname  !== "" ? router.pathname : router.route !== "" ? router.route : router.asPath)
  }, [])

  const full_menu = {
    breakfast: foodCtx.breakfast,
    lunch: foodCtx.lunch,
    dinner: foodCtx.dinner,
    snack: foodCtx.snack,
    dessert: foodCtx.dessert,
  }

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
    <AUTH_GUARD needsLoggedIn={true} needsUser={true}>
      <FullMenu meals={full_menu} mealModuleClasses={mealModuleClasses} />
    </AUTH_GUARD>
  );
};

export default Menu;
