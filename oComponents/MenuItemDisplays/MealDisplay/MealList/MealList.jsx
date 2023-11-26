import css from "./MealList.module.css";
import Meal from "./Meal/Meal";
import SUB_HEADING from "../../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";

const MealList = (props) => { 
  return ( 
    <div
      className={`${css.mealListOuterDiv}`}
      key={Math.random() * Math.random()}
    >
      {Object.keys(props.meals).map((meal, index) => {
        const mealData = props.meals[meal]
        const mealName = mealData.meal && mealData.length > 0 ? mealData.meal : meal && mealData.length > 0 ? meal : ""

        const entrees = mealData.filter((dish) => {
          return dish.is_entree && dish
        })
      
        const sides = mealData.filter((dish) => {
          return !dish.is_entree && dish
        })
        

        return mealName != "" &&

          <div key={`MealListContainer ${mealName} | ${index}`}>
            {props.mealModuleClasses.show.meal && (
              <div className={css.sectionDiv}>
                <SUB_HEADING key={`MealListMeal SUB_HEADING: ${text} | ${index}`} text={mealData.meal} />
              </div>
            )}

            <Meal
              mealModuleClasses={props.mealModuleClasses}
              mealName={mealName}
              entrees={entrees}
              sides={sides}
              key={`MealListMeal | ${mealName} | ${index}`}
            />
          </div>
      })}
    </div>
  );
};

export default MealList;
