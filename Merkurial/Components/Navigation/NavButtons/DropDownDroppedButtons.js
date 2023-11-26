import css from "./DroppedButton.module.css";
import { useRouter } from "next/router";
import React from "react";
import { linkify } from "../../../Helpers/Text/text";
import { useClass } from "../../../hooks/usehooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

const DropDownDropButton = (props) => {
  const router = useRouter();
  const classes = useClass([css.button, props.className]);
  const route = (e) => {
    e.preventDefault();
    const href = linkify(props.text);
    router.push(href);
    props.close();
  };

  const displayItems = () => {
    console.log("DISPLAYING ITEMS");
  };

  return (
    <div
      onClick={route}
      className={css.filler}
      //   style={{ backgroundColor: "black" }}
    >
      <a className={classes + " " + "btn"}>
        {props.text}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={css.chevronIcon}
          onClick={displayItems}
        />
      </a>
    </div>
  );
};

export default DropDownDropButton;
