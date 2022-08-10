import GroceryList from "./GroceryList/GroceryList";
import { Fragment, useContext, useEffect, useState } from "react";
import WeeklyPlan from "./WeeklyPlan/WeeklyPlan";
import css from "./ShoppingList.module.css";
// import AuthContext from "../../store/auth-context";

const ShoppingList = (props) => {
  // const authCtx = useContext(AuthContext);
  const [ingredients, setIngredients] = useState(props.shoppingList);

  useEffect(() => {
    setIngredients(props.shoppingList);
  }, [props.shoppingList]);

  return (
    <div className={css.shoppingContainer}>
      <Fragment>
        <h1 className={css.groceryHeader}>Grocery List</h1>
        <GroceryList
          ingredients={ingredients}
          setIngredients={setIngredients}
          scheduleId={props.scheduleId}
          getNew={props.getNew}
          reload={props.reload}
          setReload={props.setReload}
          cur={props.cur}
        />
      </Fragment>
      <div>
        {props.realMeals && (
          <Fragment>
            <h1 className={css.groceryHeader}>Weekly {props.planText} Plan</h1>
            <WeeklyPlan
              plan={props.realMeals}
              planText="Main"
              mealModuleClasses={props.mealModuleClasses}
            />
          </Fragment>
        )}
      </div>
      <div>
        {props.otherMeals && (
          <WeeklyPlan
            plan={props.otherMeals}
            planText="Other"
            mealModuleClasses={props.mealModuleClasses}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
