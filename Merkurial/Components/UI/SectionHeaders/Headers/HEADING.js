import css from "./Headers.module.css";
import React from "react";
import { useClass } from "../../../../hooks/usehooks";

const HEADING = (props) => {
  const classes = useClass([css.HEADING_DIV, props.className]);
  const headingClasses = useClass([css.HEADING, props.headingClass]);
  return (
    <div className={classes}>
      <h1
        style={props.headingStyle ? props.headingStyle : null}
        className={headingClasses}
      >
        {props.text}
      </h1>
    </div>
  );
};

export default HEADING;
