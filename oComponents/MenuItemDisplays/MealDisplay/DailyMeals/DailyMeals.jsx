import css from "./DailyMeals.module.css";
import { TitleFy } from "../../../../Merkurial/Helpers/Links/Linkify";
import SUB_HEADING from "../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";
import HEADING from "../../../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";
import Dish from "../../DishDisplay/DishList/Dish/Dish";
import BootstrapGridder, { COLUMN } from "../../../../Merkurial/Components/UI/BootStrap/BootStrapGridder"

 
const DailyMeals = (props) => {
  const { meals } = props
  const mealsAreGood = meals && Array.isArray(meals)
  return (
    <div className={css.mealListOuterDiv} key={Math.random() * Math.random()}>
      <div className={css.dayDiv}>
        <HEADING title={`Day ${props.dayCount}`} className={css.day} />
      </div> 

      {mealsAreGood && meals.map((meal, index) => {
        const { entree: entreeData, side: sideData } = meal
        const entreeIsGood = Array.isArray(entreeData) && entreeData.length > 0
        const sideIsGood = Array.isArray(sideData) && sideData.length > 0

        const entree = entreeIsGood ? entreeData[0] : {}
        const side = sideIsGood ? sideData[0] : {}

        const { details: entreeDetails, dish: entreeDishName, ingredients: entreeIngredients, mid: entreeMid } = entree
        const { ingredients_ids: entIng_ids, ingredients_uids: entIng_uids, ingredients_numbers: entIng_numbers } = entree

        const { details: sideDetails, dish: sideDishName, ingredients: sideIngredients, mid: sideMid} = side
        const { ingredients_ids: sideIng_ids, ingredients_uids: sideIng_uids, ingredients_numbers: sideIng_numbers } = entree
        const mealName = entree.meal ? entree.meal : side.meal ? side.meal : ""

        

        return (
          <div key={`MealListContainer | ${mealName} | ${index}`}>
            <div className={css.mealDiv}>
              <SUB_HEADING
                key={`Page Section | ${mealName} | ${index}`}
                text={TitleFy(mealName)}
                className={css.meal}
              />
            </div>
            <BootstrapGridder fluid>
            {entreeIsGood && entreeDishName && (
              <COLUMN>
                <SUB_HEADING text="Entree"/>
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
              </COLUMN>
              
            )}

            {sideIsGood && sideDishName && (
              <COLUMN>
                <SUB_HEADING text="Side"/>
                <Dish
                  key={`Dish - Side | ${mealName} | ${sideMid} | ${index}`}
                  dishName={sideDishName}
                  ingredients={sideIngredients}
                  mealName={mealName}
                  did={sideMid}
                  details={sideDetails}
                  dishType="side"
                  mealModuleClasses={{show:{mealType: true}}}
                  ingredients_ids={sideIng_ids}
                  ingredients_uids={sideIng_uids}
                  ingredients_numbers={sideIng_numbers}
                />
              </COLUMN>
              
            )}
            </BootstrapGridder>
          </div>
        );
      })}
    </div>
  );
};

export default DailyMeals;