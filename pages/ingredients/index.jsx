import { useContext, useEffect } from "react";
import FoodContext from "../../store/food-context";
import SiteContext from "../../store/site_context";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";
import AllIngredients from "../../oComponents/MenuItemDisplays/IngredientDisplay/AllIngredients/AllIngredients";
import { useRouter } from "next/router";

const Ingredients = () => {
  const foodCtx = useContext(FoodContext);
  const siteCtx = useContext(SiteContext)
  const router = useRouter()
  

  useEffect(() => {
    siteCtx.lastPage.save(router.pathname)
  }, [])

  return (
    <AUTH_GUARD>
      <AllIngredients allIngredients={foodCtx.allIngredients} setAllIngredients={foodCtx.setAllIngredients} />
    </AUTH_GUARD>
  );
};

export default Ingredients;
 