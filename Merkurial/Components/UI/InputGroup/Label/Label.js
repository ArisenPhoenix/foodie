import css from "./Label.module.css";
import React from "react";

const Label = (props) => {
  const classes = `${props.className} ${css.label}`;
  return <label className={classes}>{props.text}</label>;
};

export default Label;
