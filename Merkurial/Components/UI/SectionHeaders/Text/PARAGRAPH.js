import css from "./Text.module.css";
import React from "react";

const PARAGRAPH = (props) => {
  return <p className={css.paragraph}>{props.text}</p>;
};

export default PARAGRAPH;
