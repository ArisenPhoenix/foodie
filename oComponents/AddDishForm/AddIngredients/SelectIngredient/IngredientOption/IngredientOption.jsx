import css from "./IngredientOption.module.css";
// import { TitleFy } from "../../../../../Helpers/GeneralPurpose/Strings"; .

const IngredientOption = (props) => {
  const name = props.option;

  return (
    <option
      className={`${css.text} ${props.optionClass} ${css.optionClass}`}
      value={props.option}
      id={`${props.option._id}|${props.value}`}
    >
      {name}
    </option>
  );
};

export default IngredientOption;
