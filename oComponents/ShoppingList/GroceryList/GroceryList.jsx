import ToBuy from "./ToBuy/ToBuy";
import css from "./GroceryList.module.css";
import { Fragment, useEffect, useState } from "react";
import {
  formatIngredients,
  grandTotaler,
  numberTallier,
} from "../../../Helpers/ShoppingList/Numbers";
import PostButton from "../../UI/Button/PostButton/PostButton";
import Card from "../../UI/Card/Card";

const om = {
  1: ["price"],
  2: ["number"],
  3: ["ingredient"],
  4: ["total"],
};
const GroceryList = (props) => {
  const [ingredients, setIngredients] = useState(props.ingredients);
  const printPage = () => {
    print();
  };

  useEffect(() => {
    const formattedIngredients = formatIngredients(props.ingredients, om);
    setIngredients(formattedIngredients);
  }, [props.ingredients]);

  const [isLoading, setIsLoading] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [seeTotal, setSeeTotal] = useState("Total");

  const toggleButton = () => {
    seeTotal === "Total" ? setSeeTotal("Price") : setSeeTotal("Total");
  };

  const checkIngredient = (index, ingredient) => {
    console.log(ingredient);
    setIngredients((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  const getNewSchedule = async () => {
    setIsLoading(true);
    await props.getNew();
    setIsLoading(false);
  };

  useEffect(() => {
    const grand = grandTotaler(ingredients, om);
    const numberOfItems = numberTallier(ingredients, om);
    setNumberOfItems(numberOfItems);
    setGrandTotal(grand);
  }, [ingredients]);

  return (
    <div className={css.main}>
      {isLoading ? (
        <h1>Retreiving a New Schedule</h1>
      ) : ingredients && ingredients.length > 0 ? (
        <Card className={css.card}>
          <PostButton
            className={css.show}
            text={`See ${seeTotal === "Total" ? "Prices" : "Totals"}`}
            onClick={toggleButton}
          />
          <table className={css.table}>
            <tbody className={css.tbody}>
              <tr key="Grocery List Table Index" className={css.tr}>
                <th className={css.line}></th>
                <th className={css.ingredientTh}>
                  <p>Ingredient</p>
                </th>
                <th className={css.priceTh}>
                  <p>#</p>
                </th>
                {seeTotal === "Total" ? (
                  <th className={css.amountTh}>
                    <p>Total</p>
                  </th>
                ) : (
                  <th className={css.amountTh}>
                    <p>Price</p>
                  </th>
                )}
              </tr>

              {ingredients.map((ingredient, index) => {
                return (
                  <Fragment key={`TableOfIngredients: ${index}`}>
                    {ingredient.ingredient && (
                      <ToBuy
                        onClick={checkIngredient}
                        index={index}
                        key={`${ingredient._id} | ${index}`}
                        id={ingredient.id}
                        line={index + 1}
                        show={seeTotal}
                        total={ingredient.total}
                        price={ingredient.price}
                        cur={props.cur}
                        number={ingredient.number}
                        ingredient={ingredient.ingredient}
                      />
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>

          <table className={css.table2}>
            <tbody className={css.tbody}>
              <tr
                id={`totals`}
                key={`totalIngredientsRow:`}
                className={`${css.tr} ${css.bottom}`}
              >
                <th className={css.line}>
                  <p>M</p>
                </th>

                <th className={css.ingredientTh}>
                  <p>x{numberOfItems}</p>
                </th>

                <th
                  key={`totalNumberOfItems:`}
                  className={`${css.th} ${css.bottom}`}
                ></th>
                <th
                  key={`GrandTotal:`}
                  className={`${css.amountTh} ${css.bottom}`}
                >
                  <p>
                    {props.cur}
                    {grandTotal}
                  </p>
                </th>
              </tr>
            </tbody>
          </table>
        </Card>
      ) : (
        <h6 className={css.none}>No Ingredients To Display</h6>
      )}
      <span className={`${css.actionDiv} ${css.hideForPrint}`}>
        <div className={css.printDiv}>
          <PostButton className={css.getNew} text="Print" onClick={printPage} />
        </div>
        <div className={css.buttonDiv}>
          <PostButton
            className={css.getNew}
            text="New Schedule"
            onClick={getNewSchedule}
          />
        </div>
      </span>
    </div>
  );
};

export default GroceryList;

// Previous Example, Works, just make sure the above solves the issues of this one, this went
// directly into return statement, the above is put through a function in previous module
// and then ingredients state is initiated with the data and so they can now be deleted
// without adding a display none class
