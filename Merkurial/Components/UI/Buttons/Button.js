import css from "./Button.module.css";
import { useClass } from "../../../hooks/usehooks";
import React from "react";
import { useRouter } from "next/router";
import {VALIDATE_PROP} from "../../../Helpers/Verifications/Validations"

const Button = (props) => {
  const alignmentClass = props.alignment==="left" ? css.left : props.alignment === "right" ? css.right : css.center
  const divClass = useClass([css.divClass, props.className, alignmentClass]);
  
  const buttonClass = useClass([css.button, props.buttonClass]);
  return (
    <div className={divClass} value={props.value} onClick={props.onClick}>
      <button
        className={buttonClass}
        onClick={props.onClick}
        value={props.value}
      >
        <p className={css.text} onClick={props.onClick} value={props.value}>
          {props.text}
        </p>
      </button> 
    </div>
  );
};

export default Button;


export const SimpleButton = (props) => {

  return (
      <button className={props.className} 
        name={props.name} 
        id={props.id ? props.id : `SimpleButton ${Math.random()*100}`}
        onClick={props.onClick ? props.onClick : () => {}}
        onKeyDown={props.onKeyDown ? props.onKeyDown : () => {}}
      >
      {props.text}
      </button>
    )
}


export const NextButton = (props) => {
  const alignmentClass = props.align==="left" ? css.left : props.align === "right" ? css.right : css.center;
  const buttonClass = useClass([css.button, alignmentClass, props.buttonClass]);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(props.href);
  };

  return (
    <div className={buttonClass} onClick={handleClick}>
      <button className={buttonClass} onClick={handleClick} value={VALIDATE_PROP(props.value)}>
        <p className={css.text} onClick={handleClick}>
          {props.text}
        </p>
      </button>
    </div>
      
  );
};
