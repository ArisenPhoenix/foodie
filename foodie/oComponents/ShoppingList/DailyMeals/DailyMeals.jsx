import css from "./AllMeals.module.css";
import { TitleFy } from "../../../Helpers/GeneralPurpose/Strings";
import Entree from "../../Home/MealList/Meal/EntreeList/Entree/Entree";
import PageSection from "../../BasicPageComponents/PageSection/PageSection";
import PageTitle from "../../BasicPageComponents/PageTitle/PageTitle";

const AllMeals = (props) => {
  return (
    <div className={css.mealListOuterDiv} key={Math.random() * Math.random()}>
      <div className={css.dayDiv}>
        <PageTitle title={`Day ${props.dayCount}`} className={css.day} />
      </div>

      {props.meals.map((meal, index) => {
        const mealName = meal.meal;
        return (
          <div key={`MealListContainer ${Math.random() * Math.random()}`}>
            <div className={css.mealDiv}>
              <PageSection
                key={index * Math.random()}
                section={TitleFy(mealName)}
                className={css.meal}
              />
            </div>
            {meal.entree && meal.entree.dish && (
              <Entree
                access="noAccess"
                entree={meal.entree.dish}
                ingredients={meal.entree.ingredients}
                key={`Entree ${Math.random()}`}
                meal={meal.meal}
                dishType={meal.dishType}
                mealType={meal.mealType}
                id={meal.entree._id}
                instructions={meal.entree.instructions}
                setCurrentMeal={props.setCurrentMeal}
              />
            )}

            {meal.side && meal.side.dish && (
              <Entree
                access="noAccess"
                entree={meal.side.dish}
                ingredients={meal.side.ingredients}
                key={`Side ${Math.random()}`}
                meal={meal.meal}
                id={meal.side._id}
                instructions={meal.side.instructions}
                setCurrentMeal={props.setCurrentMeal}
                dishType={meal.dishType}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllMeals;
