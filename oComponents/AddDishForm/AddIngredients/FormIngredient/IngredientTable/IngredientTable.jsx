import css from "./IngredientTable.module.css";
import { Fragment } from "react";
import FormIngredientList from "../FormIngredientList";

const IngredientTable = (props) => {
  const deleter = (index) => {
    props.delete(index);
  };
  return (
    <Fragment>
      {props.ingredients.length > 0 ? (
        <div className={css.ingredientsDiv}>
          <table className={css.table}>
            <tbody className={css.tbody}>
              <tr key="Ingredient Price Header">
                <th className={css.th}>Ingredients</th>
                <th className={css.th}>Prices</th>
                <th className={css.th}>Number</th>
              </tr>
              {props.ingredients.map((ingredient, index) => {
                return (
                  <FormIngredientList
                    onClick={deleter}
                    index={index}
                    key={`${ingredient._id} | ${index}`}
                    id={ingredient.id}
                    line={index + 1}
                    price={ingredient.price}
                    number={ingredient.number}
                    ingredient={ingredient.ingredient}
                    hide={true}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </Fragment>
  );
};

export default IngredientTable;
