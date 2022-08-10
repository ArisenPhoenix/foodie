import css from "./ToBuy.module.css";
import { useContext } from "react";
import FoodContext from "../../../../store/user-context";
const ToBuy = (props) => {
  const foodCtx = useContext(FoodContext);
  const currency = props.cur;
  const deleter = (event) => {
    event.preventDefault();
    props.onClick(props.line, props.index, props.id);
  };
  return (
    <tr id={props.id} index={props.index} onClick={deleter} className={css.tr}>
      <td className={`${css.line}`}>{props.line}:</td>
      <td className={css.td}>
        <p className={css.p}>{props.ingredient}</p>
      </td>
      <td className={css.price}>
        <p className={css.p}>
          {currency}
          {props.price}
        </p>
      </td>

      <td className={css.td}>
        <p className={css.p}>
          {currency} {Math.round(props.total)}
        </p>
      </td>
    </tr>
  );
};

export default ToBuy;
