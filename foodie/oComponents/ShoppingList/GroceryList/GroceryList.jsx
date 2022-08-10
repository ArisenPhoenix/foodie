import ToBuy from "./ToBuy/ToBuy";
import css from "./GroceryList.module.css";
import { Fragment, useEffect, useState, useContext } from "react";
import PostButton from "../../UI/Button/PostButton/PostButton";
import Card from "../../UI/Card/Card";

const GroceryList = (props) => {
  const [ingredients, setIngredients] = useState(props.ingredients);

  const printPage = () => {
    print();
  };

  useEffect(() => {
    const formattedIngredients = props.ingredients.filter(
      (numberObj, ingredient) => {
        const item = ingredient.ingredient;
        const price =
          numberObj.price === "" ||
          numberObj.price === "undefined" ||
          numberObj.price === null
            ? (numberObj.price = 1)
            : +numberObj.price;

        const number =
          typeof numberObj.number === "number" && numberObj.number > 0
            ? numberObj.number
            : 1;

        const totalPrice = number * price;
        const itemName = numberObj[item];
        if (ingredient.ingredient === "undefined") {
          return;
        }
        return (
          (numberObj["total"] = totalPrice),
          (numberObj["price"] = +numberObj["price"])
        );
      },
      {}
    );
    setIngredients(formattedIngredients);
  }, [props.ingredients]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalIndiPrice, setTotalIndiPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [itemNumber, setItemNumber] = useState({});

  const checkIngredient = (line, index, id) => {
    const fixedIngredients = ingredients;
    delete fixedIngredients[index];
    // console.log(index);

    props.setIngredients((prev) => {
      return fixedIngredients;
    });
  };

  const getNewSchedule = async () => {
    setIsLoading(true);
    await props.getNew();
    setIsLoading(false);
  };

  useEffect(() => {
    const price =
      ingredients &&
      ingredients.reduce((total, iPrice) => {
        const price = iPrice.price;
        if (price === "undefined" || price === undefined || price.length > 6) {
          return total + 0;
        } else {
          return total + price;
        }
      }, 0);

    const grand =
      ingredients &&
      ingredients.reduce((total, iPrice) => {
        const price = iPrice.price;
        const number = iPrice.number;
        if (number === NaN || price === NaN) {
        }

        if (
          price === "undefined" ||
          price === undefined ||
          price.length > 6 ||
          price === NaN ||
          number === NaN
        ) {
          return total + 0;
        } else {
          return total + price * number;
        }
      }, 0);

    const numberOfItems =
      ingredients &&
      ingredients.reduce((total, iPrice) => {
        const number = iPrice.number;
        if (price === "undefined" || price === undefined || price.length > 6) {
          return total + 0;
        } else {
          return total + number;
        }
      }, 0);

    const numberOfItems2 = ingredients.filter((numberObj, ingredient) => {
      const item = ingredient.ingredient;
      const price =
        numberObj.price === "" ||
        numberObj.price === "undefined" ||
        numberObj.price === null
          ? (numberObj.price = 1)
          : +numberObj.price;

      const number =
        typeof numberObj.number === "number" && numberObj.number > 0
          ? numberObj.number
          : 1;

      const totalPrice = number * price;
      const itemName = numberObj[item];
      return (
        (numberObj["total"] = totalPrice),
        (numberObj["price"] = +numberObj["price"])
      );
    }, {});

    setItemNumber(numberOfItems2);
    setNumberOfItems(numberOfItems);
    setGrandTotal(grand);
    setTotalIndiPrice(price);
  }, [ingredients]);

  return (
    <div className={css.main}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : ingredients && ingredients.length > 0 ? (
        <Card className={css.card}>
          <table className={css.table}>
            <tbody className={css.tbody}>
              <tr key="Grocery List Table Index" className={css.tr}>
                <th className={css.line}></th>
                <th className={css.ingredientTh}>
                  <p>Ingredient</p>
                </th>
                <th className={css.priceTh}>
                  <p>Price</p>
                </th>
                <th className={css.amountTh}>
                  <p>Amount</p>
                </th>
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
                    {grandTotal.toFixed(2)}
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
