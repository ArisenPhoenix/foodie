import ShoppingList from "../../oComponents/ShoppingList/ShoppingList";
import FoodContext from "../../store/food-context";
import { useContext } from "react";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";

const Home = (props) => {
  const foodCtx = useContext(FoodContext);

  const otherDays = 3;
  const weeklyDays = 7;

  const showMeals = false;
  const showMealType = false;

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

  const realMeals = foodCtx && foodCtx.mainMeals && foodCtx.mainMeals.list;
  const realIngredients =
    foodCtx && foodCtx.mainMeals && foodCtx.mainMeals.ingredients;
  const otherMeals = foodCtx && foodCtx.otherMeals && foodCtx.otherMeals.list;
  const otherIngredients =
    foodCtx && foodCtx.otherMeals && foodCtx.otherMeals.ingredients;

  const a_shoppingList =
    realIngredients &&
    otherIngredients &&
    [...realIngredients, ...otherIngredients].sort((a, b) => {
      var textA = a.ingredient;
      var textB = b.ingredient;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });


  return (
    <AUTH_GUARD needsAdmin={false} needsLoggedIn={true} needsUser={true}>
      <ShoppingList
        shoppingList={a_shoppingList}
        realMeals={realMeals}
        realIngredients={realIngredients} 
        otherMeals={otherMeals}
        otherIngredients={otherIngredients}
        menuId={foodCtx.menuId}
        scheduleId={foodCtx.scheduleId}
        otherDays={otherDays}
        weeklyDays={weeklyDays}
        showMeals={showMeals}
        showMealType={showMealType}
        mealModuleClasses={mealModuleClasses}
        getNew={foodCtx.getNew}
        reload={foodCtx.reload}
        setReload={foodCtx.setReload}
        hasIngredients={foodCtx.hasScheduleIngredients}
      />
    </AUTH_GUARD>
  );
};

export default Home;
