import css from "./Entree.module.css";
import Ingredients from "../../../IngredientDisplay/IngredientList/Ingredients"
import Card from "../../../../UI/Card/Card";
import SUB_HEADING from "../../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING"
import { useContext } from "react";
import { useRouter } from "next/router";
import { TitleFy } from "../../../../../Merkurial/Helpers/Links/Linkify";
import SiteContext from "../../../../../store/site_context";


const Dish = (props) => {
  const siteCtx = useContext(SiteContext)
  const router = useRouter();
  const mealName = props.mealName ? props.mealName : currentMeal
  const dishName = props.dishName ? props.dishName : router.query.dish

  const getMeal = () => {
    const rootPath = "/menu"
    router.push(`${rootPath}/${mealName}/${dishName}`);
  };

  const getMealHandler = () => {

    const currentMealData = {
      showDishType: props.showDishType,
      setCurrentMeal: () => {siteCtx.lastMeal.save(router.query.meal)},
      setCurrentDish: () => {siteCtx.lastDish.save},
      showMeals: props.showMeals,
      index: props.index,
      dishType: props.dishType,
      mealName: mealName,
      dishName: dishName,
      did: props.did,
      ingredients: props.ingredients ? props.ingredients : [],
      details: props.details,
      ingredients_ids: props.ingredients_ids,
      ingredients_uids: props.ingredients_uids,
      ingredients_numbers: props.ingredients_numbers
    }
  
    siteCtx.lastDish.save(currentMealData)
    siteCtx.lastPage.save(router.asPath)
    siteCtx.lastMeal.save(router.query.meal)
    getMeal();

  };
  
  const is_entree = props.entree || props.dishType === "entree"
  return (
    <Card
      id={props.id}
      onClick={props.access === "noAccess" ? null : getMealHandler}
      key={`IngredientCard | ${props.dishName} | ${props.did}`}
      className={`${is_entree ? css.entreeCard : css.sideCard} `}
    >
      <>
        <div className={css.heading}>
          <SUB_HEADING
            text={TitleFy(props.dishName)}
          />
        </div>

        { props.ingredients.length > 0 && 
        <Ingredients 
          key={`Ingredients-Creation: ${Math.random()}`}
          ingredients={props.ingredients ? props.ingredients : []}
          className={`${is_entree ? css.entreeIngredients : css.sideIngredients}`}
        /> 
        }
      </>
    </Card>
  );
};

export default Dish;
