import { useContext, Fragment, useState } from "react";
import css from "./FormIngredients.module.css";
import Ingredient from "../IngredientInput/Ingredient";
import IngredientPrice from "../IngredientInput/IngredientPrice";
import BusinessContext from "../../../../store/business-context";
import BootstrapGridder from "../../../UI/BootStrap/BootStrapGridder";
import Col from "react-bootstrap/Col";
import Button from "../../../UI/Button/PostButton/PostButton";
import Label from "../../../UI/Label/Label";
import FormIngredientList from "./FormIngredientList";
import FoodContext from "../../../../store/food-context";
import SelectIngredient from "../SelectIngredient/SelectIngredient";
import Input from "../../../UI/Input/Input";

const AddIngredients = (props) => {
  const busiCtx = useContext(BusinessContext);
  const foodCtx = useContext(FoodContext);
  const listIngredients = foodCtx.allIngredients;
  const deleter = (index) => {
    props.removeIngredient(index);
  };

  return (
    <div>
      <div className={css.labelDiv}>
        <Label
          text={props.label.text}
          className={`btn form-control  ${css.mainLabel}`}
        />
      </div>
      <BootstrapGridder>
        <Col xs="12" md="5">
          <SelectIngredient
            options={listIngredients}
            choose={false}
            label="Meal"
            labelClass={css.label}
            optionClass={css.selectorsOptions}
            className={css.selectLeft}
            onChange={props.onChange}
            htmlSize={100}
            value={meal}
            id="meal"
            name="meal"
            bsPrefix={css.selectPrefix}
          />
        </Col>
        <Col>
          <Input
            input={{
              label: "number",
              text: "number",
              type: "number",
              id: "number",
              name: "number",
              separate: "true",
              onChange: props.onChange,
            }}
            onChange={props.onChange}
          />
        </Col>
        <Col>
          <Button
            id={props.buttonId}
            onClick={props.onClick}
            text="+"
            type="button"
            className={`btn btn-primary ${css.button}`}
            onKeyDown={props.onKeyDown}
          />
        </Col>
      </BootstrapGridder>

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
                    number={ingredient.number ? ingredient.number : 1}
                    // number={ingredient.number}
                    ingredient={ingredient.ingredient}
                    hide={true}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default AddIngredients;
