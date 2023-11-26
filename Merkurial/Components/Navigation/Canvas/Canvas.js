import css from "./Canvas.module.css";
import React from "react";

const Canvas = (props) => {
  return (
    <div className={css.main} 
      style={
        {
          backgroundImage:`url(${props.bg && props.bg.src})`,
          backgroundColor: props.bg ? props.bg : props.color
        }
        }>
          {props.children}
    </div>);
};

export default Canvas;
