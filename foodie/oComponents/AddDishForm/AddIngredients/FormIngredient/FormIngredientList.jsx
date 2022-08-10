import css from "./FormIngredientList.module.css";
import Card from "../../../UI/Card/Card";
import { useContext, useState } from "react";
import BusinessContext from "../../../../store/business-context";
import FoodContext from "../../../../store/food-context";
const FormIngredientList = (props) => {
  const foodCtx = useContext(FoodContext);

  const deleter = () => {
    props.onClick && props.onClick(props.index, props.id);
  };
  return (
    <tr id={props.id} index={props.index} onClick={deleter} className={css.tr}>
      <th className={css.th}>
        <p className={css.p}>{props.ingredient}</p>
      </th>
      <th className={css.th}>
        <p className={css.p}>
          {foodCtx.currency}: {props.price}
        </p>
      </th>
      <th className={css.th}>
        <p className={css.p}>{props.number}</p>
      </th>
    </tr>
  );
};

export default FormIngredientList;
