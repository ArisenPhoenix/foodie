import css from "./DailyMeals.module.css";
import { TitleFy } from "../../../../Merkurial/Helpers/Links/Linkify";
import Meal from "../MealList/Meal/Meal";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import PageTitle from "../../../BasicPageComponents/PageTitle/PageTitle";
import Dish from "../../DishDisplay/DishList/Dish/Dish";
import DishList from "../../DishDisplay/DishList/DishList";

const DailyMeals = (props) => {
  // console.log("DAILY MEALS PROPS: ", props)
  const { meals } = props
  const mealsAreGood = meals && Array.isArray(meals)
  return (
    <div className={css.mealListOuterDiv} key={Math.random() * Math.random()}>
      <div className={css.dayDiv}>
        <PageTitle title={`Day ${props.dayCount}`} className={css.day} />
      </div> 

      {mealsAreGood && meals.map((meal, index) => {
        const { entree: entreeData, side: sideData } = meal
        const entreeIsGood = Array.isArray(entreeData) && entreeData.length > 0
        const sideIsGood = Array.isArray(sideData) && sideData.length > 0

        const entree = entreeIsGood ? entreeData[0] : {}
        const side = sideIsGood ? sideData[0] : {}

        const { details: entreeDetails, dish: entreeDishName, ingredients: entreeIngredients, mid: entreeMid } = entree
        const { ingredients_ids: entIng_ids, ingredients_uids: entIng_uids, ingredients_numbers: entIng_numbers } = entree
        // console.log("ENTREE MID: ", entreeMid)
        const { details: sideDetails, dish: sideDishName, ingredients: sideIngredients, mid: sideMid} = side
        const { ingredients_ids: sideIng_ids, ingredients_uids: sideIng_uids, ingredients_numbers: sideIng_numbers } = entree
        const mealName = entree.meal ? entree.meal : side.meal ? side.meal : ""
        console.log("ENTREE: ", entree)
        

        return (
          <div key={`MealListContainer | ${mealName} | ${index}`}>
            <div className={css.mealDiv}>
              <PageSection
                key={`Page Section | ${mealName} | ${index}`}
                section={TitleFy(mealName)}
                className={css.meal}
              />
            </div>
            {entreeIsGood && entreeDishName && (
              <Dish
                key={`Dish - Entree | ${mealName} | ${entreeMid} | ${index}`}
                index={index}
                dishName={entreeDishName}
                ingredients={entreeIngredients}
                
                mealName={mealName} 
                entree={entree.is_entree}
                dishType="entree"
                mealType={entree.meal}
                did={entreeMid}
                details={entreeDetails}
                mealModuleClasses={{show:{mealType: true}}}
                ingredients_ids={entIng_ids}
                ingredients_uids={entIng_uids}
                ingredients_numbers={entIng_numbers}
              />
            )}

            {sideIsGood && sideDishName && (
              <Dish
                key={`Dish - Side | ${mealName} | ${sideMid} | ${index}`}
                dishName={sideDishName}
                ingredients={sideIngredients}
                mealName={mealName}
                id={sideMid}
                details={sideDetails}
                dishType={meal.dishType}
                mealModuleClasses={{show:{mealType: true}}}
                ingredients_ids={sideIng_ids}
                ingredients_uids={sideIng_uids}
                ingredients_numbers={sideIng_numbers}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DailyMeals;



import css from "./DailyMeals.module.css";
import { TitleFy } from "../../../../Merkurial/Helpers/Links/Linkify";
import Meal from "../MealList/Meal/Meal";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";
import PageTitle from "../../../BasicPageComponents/PageTitle/PageTitle";

export const DailyMeals2 = (props) => {
  const meals = props.meals 
  const mealsAreGood = meals && Array.isArray(meals)
  return (
    <div className={css.mealListOuterDiv} key={Math.random() * Math.random()}>
      <div className={css.dayDiv}>
        <PageTitle title={`Day ${props.dayCount}`} className={css.day} />
      </div>

      {mealsAreGood && meals.map((meal, index) => {
        console.log("MEAL: ", meal)
        const mealName = meal.meal;
        return (
          <div key={`MealListContainer | ${mealName} | ${index}`}>
            <div className={css.mealDiv}>
              <PageSection
                key={`Page Section | ${mealName} | ${index}`}
                section={TitleFy(mealName)}
                className={css.meal}
              />
            </div> 
            {meal.is_entree && meal.entree.dish && (
              <Meal
                dish={meal.entree.dish}
                ingredients={meal.entree.ingredients}
                key={`Entree | ${mealName} | ${index}`}
                mealName={mealName}
                dishType={meal.dishType}
                mealType={meal.mealType}
                id={meal.entree.mid}
                instructions={meal.entree.instructions}
                setCurrentMeal={props.setCurrentMeal}
                mealModuleClasses={{}}
              />
            )}

            {!meal.is_entree && meal.side.dish && (
              <Meal
                dish={meal.side.dish}
                ingredients={meal.side.ingredients}
                key={`Side | ${mealName} | ${index}`}
                mealName={mealName}
                id={meal.side.mid}
                instructions={meal.side.instructions}
                setCurrentMeal={props.setCurrentMeal}
                dishType={meal.dishType}
                mealModuleClasses={{show:{mealType: true}}}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

