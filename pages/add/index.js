import AddDishForm from "../../oComponents/AddDishForm/AddDishFormPage";
import { useContext } from "react";
import FoodContext from "../../store/food-context";
import AuthGuard from "../../Helpers/AuthGuard/AuthGuard";

const AddNewDishPage = (props) => {
  console.log("add");
  const foodCtx = useContext(FoodContext);
  const menu = [
    foodCtx.breakfast,
    foodCtx.lunch,
    foodCtx.dinner,
    foodCtx.snack,
    foodCtx.dessert,
  ];

  const dishes = [];

  menu.forEach((meal) => {
    meal && meal.meal && dishes.push(meal.meal);
  });
  dishes.unshift("Choose");

  return (
    <AuthGuard>
      <AddDishForm dishes={dishes} />
    </AuthGuard>
  );
};

export default AddNewDishPage;
