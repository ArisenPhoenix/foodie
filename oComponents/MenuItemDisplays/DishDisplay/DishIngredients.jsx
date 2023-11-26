import { Fragment } from "react";
import css from "./DishIngredients.module.css";
import IngredientTh from "../IngredientDisplay/SingleIngredient"
import SUB_HEADING from "../../../Merkurial/Components/UI/SectionHeaders/Headers/SUB_HEADING";

const DishIngredients = (props) => {
  const ingredients = props.ingredients
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
              {ingredients &&
                ingredients.map((ingredient, index) => {
                  return (
                    <IngredientTh
                      cur={props.cur}
                      index={index}
                      key={`${ingredient.iid} | ${index}`}
                      id={ingredient.iid}
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
        <SUB_HEADING text={`There Are No Ingredients`} />
      )}
    </Fragment>
  );
};

export default DishIngredients;
