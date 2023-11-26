import { Fragment } from "react";
import ToBuy from "./ToBuy/ToBuy";
import css from "./GroceryList.module.css"

const GroceryListTable = (props) => {
    const ingredients = props.ingredients
    const seeTotal = props.seeTotal
    const grandTotal = props.grandTotal
    const numberOfItems = props.numberOfItems
    const currency = props.currency

    return (
    <>
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
                            onClick={props.onClick}
                            index={index}
                            key={`${ingredient.ingredient} | ${ingredient.iid} | ${index}`}
                            id={ingredient.id}
                            line={index + 1}
                            show={seeTotal}
                            total={ingredient.total}
                            price={ingredient.price}
                            currency={currency}
                            number={ingredient.number}
                            ingredient={ingredient.ingredient}
                            checkedIndices={props.checkedIndices}
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
                    {currency}
                    {grandTotal}
                    </p>
                </th>
                </tr>
            </tbody>
        </table>

    </>
    )
}


export default GroceryListTable