import { Fragment, useContext } from "react";
import IngredientsPage from "../../oComponents/IngredientsPage/IngredientsPage";
import FoodContext from "../../store/food-context";
import AuthGuard from "../../Helpers/AuthGuard/AuthGuard";

const Ingredients = () => {
  const foodCtx = useContext(FoodContext);
  const allIngredients = foodCtx.allIngredients;
  return (
    <AuthGuard>
      <IngredientsPage ingredients={allIngredients} />
    </AuthGuard>
  );
};

export default Ingredients;
