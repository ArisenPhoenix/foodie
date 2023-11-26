import Label from "./Label/Label";
import css from "./InputGroup.module.css";
import Input from "./Input/Input";
import React from "react";

const InputGroupSameLine = (props) => {
  const l = props.label;
  const i = props.input;
  const labelClasses = `${props.labelClass} ${css.label}`;
  const inputClasses = `${props.inputClass} ${css.input}`;

  return (
    <div>
      <div className={css.labelDiv}>
        <Label text={l?.text ? l.text: props.text} className={labelClasses} />
      </div>
      <div className={css.inputDiv}>
        <Input
          placeholder={i?.text ? i.text: props.text}
          className={inputClasses}
        />
      </div>
    </div>
  );
};

export default InputGroupSameLine;
