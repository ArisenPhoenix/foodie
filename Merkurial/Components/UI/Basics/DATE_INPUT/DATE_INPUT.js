import INPUT_LABEL from "../INPUT_LABEL/INPUT_LABEL";

const DATE_INPUT = (props) => {
  const inp = props.input;
  const lab = props.label;
  return (
    <INPUT_LABEL
      required={props.required}
      className={props.className}
      input={{ ...inp, type: "date" }}
      label={{ ...lab }}
    />
  );
};

export default DATE_INPUT;
