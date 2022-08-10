import css from "./MealList.module.css";
import Meal from "../Meal/Meal";
import PageSection from "../../../BasicPageComponents/PageSection/PageSection";

const MealList = (props) => {
  return (
    <div
      className={`${css.mealListOuterDiv}`}
      key={Math.random() * Math.random()}
    >
      {props.meals.map((meal, index) => {
        return (
          <div key={`MealListContainer ${Math.random() * Math.random()}`}>
            {props.mealModuleClasses.show.meal && (
              <div className={css.sectionDiv}>
                <PageSection key={index * Math.random()} section={meal.meal} />
              </div>
            )}

            <Meal
              mealModuleClasses={props.mealModuleClasses}
              showDishType={props.showDishType}
              meal={meal.meal}
              entrees={meal.entrees}
              sides={meal.sides}
              key={`MealListMeal ${Math.random() * Math.random()}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MealList;
