import { Fragment } from "react";
import css from "./DishIngredients.module.css";
import FormIngredientList from "../AddDishForm/AddIngredients/FormIngredient/FormIngredientList";

const DishIngredients = (props) => {
  return (
    <Fragment>
      {props.ingredients && props.ingredients.length > 0 ? (
        <div className={css.ingredientsDiv}>
          <table className={css.table}>
            <tbody className={css.tbody}>
              <tr key="Ingredient Price Header">
                <th className={css.th}>Ingredient</th>
                <th className={css.th}>Price</th>
                <th className={css.th}>Number</th>
              </tr>
              {props.ingredients &&
                props.ingredients.map((ingredient, index) => {
                  return (
                    <FormIngredientList
                      cur={props.cur}
                      index={index}
                      key={`${ingredient._id} | ${index}`}
                      id={ingredient.id}
                      line={index + 1}
                      price={ingredient.price}
                      number={ingredient.number}
                      ingredient={ingredient.ingredient}
                      hide={true}
                      onClick={null}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Fragment>
  );
};

export default DishIngredients;
