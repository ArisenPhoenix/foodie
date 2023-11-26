import { Form } from "react-bootstrap";
import css from "./Select.module.css";
import Option from "./Option/Option";
import Label from "../Label/Label";

const Select = (props) => {
  const classes = ` ${props.className} ${css.div}`;
  const options = props.options;

  if (props.choose === true) {
    options.unshift("Choose");
  }
 
  return (
    <div
      className={classes}
      name={props.name}
      id={props.id}
      value={props.value}
    >
      <Label
        text={props.label}
        // className={props.labelClass}
        value={props.value}
      />
      <Form.Select
        aria-label="Selection"
        // className={css.select}
        onChange={props.onChange}
        id={props.id}
        name={props.name}
        value={props.value}
      >
        {options.map((option, index) => {
          return (
            <Option
              key={`${option}|${index}-${Math.random() * Math.random()}`}
              value={props.value}
              option={option}
              optionClass={`${props.optionClass}`}
              className={
                index === props.options.length - 1
                  ? `${css.finalOption} `
                  : null
              }
            />
          );
        })}
      </Form.Select>
    </div>
  );
};

export default Select;
