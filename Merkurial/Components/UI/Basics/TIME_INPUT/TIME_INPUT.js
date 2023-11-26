import { useClass } from "../../../../hooks/usehooks";
import INPUT_LABEL from "../INPUT_LABEL/INPUT_LABEL";
import css from "./TIME_INPUT.module.css";

const TIME_INPUT = (props) => {
  const inputClass = useClass([props.input.className, css.timeInput]);
  return (
    <INPUT_LABEL
      required={props.required}
      className={props.className}
      label={{ ...props.label }}
      input={{ ...props.input, type: "time", className: inputClass }}
    />
  );
};

export default TIME_INPUT;
