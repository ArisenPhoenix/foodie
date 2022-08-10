import css from "./FullMenu.module.css";
import MealList from "../MealList/MealList/MealList";
import PageTitle from "../../BasicPageComponents/PageTitle/PageTitle";

const FullMenu = (props) => {
  return (
    <div
      className={css.fullMenuDiv}
      key={`FullMeal ${Math.random() * Math.random()}`}
    >
      <div className={css.title}>
        <PageTitle title="Full Menu" key={Math.random()} />
      </div>
      <MealList
        mealModuleClasses={props.mealModuleClasses}
        classes={{ class: null, plural: true }}
        meals={props.meals}
        key={`MealListMeal ${Math.random() * Math.random()}`}
      />
    </div>
  );
};

export default FullMenu;
