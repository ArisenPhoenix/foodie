import css from "./FullMenu.module.css";
import MealList from "../../MenuItemDisplays/MealDisplay/MealList/MealList";
import HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/HEADING";

const FullMenu = (props) => {
  return (
    <div
      className={css.fullMenuDiv}
      key={`FullMeal ${Math.random() * Math.random()}`}
    >
      <div className={css.title}>
        <HEADING text="Full Menu" key={Math.random()} />
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
