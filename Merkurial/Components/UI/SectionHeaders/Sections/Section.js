import css from "./Sections.module.css"
import React from "react";

const SECTION = (props) => {
  return <h2 className={css.heading}>{props.text}</h2>;
};

export default SECTION;
