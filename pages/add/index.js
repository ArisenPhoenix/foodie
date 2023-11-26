import CreateDishForm from "../../oComponents/Forms/FormsAddMenuItems/AddNewDish";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import FoodContext from "../../store/food-context";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";
import SiteContext from "../../store/site_context";

const AddNewDishPage = (props) => {
  const router = useRouter()
  const foodCtx = useContext(FoodContext);
  const siteCtx = useContext(SiteContext)
  const currentPage = router.asPath
  

  useEffect(() => {
    siteCtx.lastPage.save({lastPage: currentPage})
  }, [])

  
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
    <AUTH_GUARD>
      <CreateDishForm dishes={["Choose", "Breakfast", "Lunch", "Dinner"]} />
    </AUTH_GUARD>
  );
};

export default AddNewDishPage;
