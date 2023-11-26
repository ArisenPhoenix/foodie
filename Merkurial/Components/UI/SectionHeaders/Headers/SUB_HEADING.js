import css from "./Headers.module.css";
import React from "react";

const SUB_HEADING = (props) => {
  return <h2 className={css.SUB_HEADING}>{props.text}</h2>;
};

export default SUB_HEADING;
