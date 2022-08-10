import { Fragment } from "react";
import DailyMeals from "../DailyMeals/DailyMeals";

const WeeklyPlan = (props) => {
  return (
    <Fragment>
      {props.plan.map((mealsOfTheDay, index) => {
        return (
          <DailyMeals
            key={Math.random() * (index + 1) + Math.random()}
            dayCount={index + 1}
            meals={mealsOfTheDay}
            mealModuleClasses={props.mealModuleClasses}
          />
        );
      })}
    </Fragment>
  );
};

export default WeeklyPlan;
