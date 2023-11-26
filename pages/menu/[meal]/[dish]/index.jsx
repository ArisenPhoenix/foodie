import FoodContext from "../../../../store/food-context";
import SiteContext from "../../../../store/site_context";
import { useContext } from "react";
import EditOrViewDishPage from "../../../../oComponents/DishPage/EditOrViewDishPage";
import AUTH_GUARD from "../../../../Merkurial/Auth/AUTH";

const Dish = () => {
  const siteCtx = useContext(SiteContext);
  const foodCtx = useContext(FoodContext)

  return (
    <AUTH_GUARD needsLoggedIn={true} needsUser={true}>
      <EditOrViewDishPage
        dishData={siteCtx.lastDishData}
        allIngredients={foodCtx.allIngredients}
      />
    </AUTH_GUARD> 
  );
};

export default Dish;
