import css from "./FormIngredientList.module.css";
import { useContext } from "react";
import USER_CONTEXT from "../../../Merkurial/store/Context/USER_CONTEXT/user_context";

const SingleIngredient = (props) => {
  const userCtx = useContext(USER_CONTEXT);

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
          {userCtx.userData.currency}: {props.price}
        </p>
      </th>
      <th className={css.th}>
        <p className={css.p}>{props.number}</p>
      </th>
    </tr>
  );
};

export default SingleIngredient;
