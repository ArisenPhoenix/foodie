import css from "./Input.module.css";
import React from "react";

const Input = (props) => {
  const classes = `${css.input} ${props.className ? props.className : null}`;
  return (
    <input
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={classes}
      value={props.text}
    />
  );
};

export default Input;
