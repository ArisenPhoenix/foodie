import FoodContext from "../../../../store/food-context";
import AuthContext from "../../../../store/auth-context";
import { useContext } from "react";
import DishPage from "../../../../oComponents/DishPage/DishPage";
import AuthGuard from "../../../../Helpers/AuthGuard/AuthGuard";

const Dish = () => {
  const authCtx = useContext(AuthContext);
  const foodCtx = useContext(FoodContext);
  const currentMeal = foodCtx.currentMeal;
  const updateDish = foodCtx.updateDish;
  const setCurrentMeal = foodCtx.setCurrentMeal;

  if (currentMeal.dish) {
    authCtx.lastMeal.save(currentMeal, "DISH INDEX PAGE");
  }

  return (
    <AuthGuard currentMeal={currentMeal}>
      <DishPage
        mealData={currentMeal}
        updateDish={updateDish}
        deleteDish={foodCtx.deleteDish}
        setCurrentMeal={setCurrentMeal}
      />
    </AuthGuard>
  );
};

export default Dish;
