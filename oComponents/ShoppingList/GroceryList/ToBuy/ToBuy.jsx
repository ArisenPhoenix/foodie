import css from "./ToBuy.module.css";
import { useState } from "react";
import { longDecimalFix } from "../../../../Merkurial/Helpers/Numbers/decimals";

const ToBuy = (props) => {
  const currency = props.currency;
  const checked = props.checkedIndices.includes(props.index)

  const checkItem = (event) => {
    event.preventDefault();
    props.onClick(props.index, checked);
    
  };

  let total = props.total;

  if (String(total).length > 5) {
    total = longDecimalFix(total, 2);
  }

  return (
    <tr id={props.id} index={props.index} onClick={checkItem} className={checked ? css.trChecked : css.tr}>
      <td className={`${checked ? `${css.line}` : css.line}`}>{checked ? `✅` : props.line}</td>
      <td className={`${checked ? `${css.td}` : css.td}`}>
        <p className={css.p}>{props.ingredient}</p>
      </td>
      <td className={`${checked ? `${css.td}` : css.td}`}>
        <p className={css.p}>{props.number}</p>
      </td>

      {props.show === "Total" ? (
        <td className={`${checked ? `${css.td}` : css.td}`}>
          <p className={css.p}>
            {currency}
            {total}
          </p>
        </td>
      ) : (
        <td className={css.price}>
          <p className={css.p}>
            {currency}
            {props.price}
          </p>
        </td>
      )}
    </tr>
  );
};

export default ToBuy;
