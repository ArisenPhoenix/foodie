import css from "./Text.module.css";
import React from "react";

const Caption = (props) => {
  return <p className={css.caption}>{props.text}</p>;
};

export default Caption;
