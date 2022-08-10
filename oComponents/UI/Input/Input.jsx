import React from "react";
import css from "./Input.module.css";

const Input = (props) => {
  const classes = `${css.input} ${props.className}`;
  return (
    <div className={classes}>
      {props.label && <label {...props.label}>{props.label.text}</label>}
      {props.input.separate === true ? <br></br> : null}
      <input {...props.input} />
    </div>
  );
};

export default Input;
