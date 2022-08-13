import css from "./ToBuy.module.css";
import { longDecimalFix } from "../../../../Helpers/GeneralPurpose/Numbers";

const ToBuy = (props) => {
  const currency = props.cur;
  const deleter = (event) => {
    event.preventDefault();
    props.onClick(props.line, props.index, props.id);
  };

  let total = props.total;
  // console.log(total);

  if (String(total).length > 5) {
    total = longDecimalFix(total, 2);
  }

  return (
    <tr id={props.id} index={props.index} onClick={deleter} className={css.tr}>
      <td className={`${css.line}`}>{props.line}:</td>
      <td className={css.td}>
        <p className={css.p}>{props.ingredient}</p>
      </td>
      <td className={css.td}>
        <p className={css.p}>{props.number}</p>
      </td>

      {props.show === "Total" ? (
        <td className={css.td}>
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
