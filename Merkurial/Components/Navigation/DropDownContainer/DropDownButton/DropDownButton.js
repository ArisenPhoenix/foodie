import css from "./DropDownButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

const DropDownButton = (props) => {
  return (
    <div onClick={props.onClick}>
      <FontAwesomeIcon
        icon={faBars}
        style={{
          height: "3rem",
          color: "antiquewhite",
        }}
      />
    </div>
  );
};

export default DropDownButton;
