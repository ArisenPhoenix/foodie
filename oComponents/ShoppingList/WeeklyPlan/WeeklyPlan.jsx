import css from "./WeeklyPlan.module.css"
import HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";
import DailyMeals from "../../MenuItemDisplays/MealDisplay/DailyMeals/DailyMeals";

const WeeklyPlan = (props) => {
  const { plan } = props
  const planIsGood = plan && Array.isArray(plan)
  return (
    <>
      {planIsGood && plan.map((mealsOfTheDay, index) => {
        return (
          <div key={`Daily Meals | ${index}`} >
            <HEADING text={`Day ${index+1}`} className={css.day} />
            <DailyMeals
              dayCount={index + 1}
              meals={mealsOfTheDay}
              mealModuleClasses={props.mealModuleClasses}
            />
          </div>
        );
      })} 
    </> 
  );
}; 

export default WeeklyPlan; 
