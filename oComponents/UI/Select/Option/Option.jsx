import css from "./Option.module.css";

const Option = (props) => {
  return (
    <option
      className={`${css.text} ${props.optionClass}`}
      value={props.option}
      id={`${props.option}|${props.value}`}
    >
      {props.option}
    </option>
  );
};

export default Option;
