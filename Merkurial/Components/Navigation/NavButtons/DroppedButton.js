import css from "./DroppedButton.module.css";
import { useRouter } from "next/router";
import React from "react";
import { linkify } from "../../../Helpers/Text/text";
import { useClass } from "../../../hooks/usehooks";

const DroppedButton = (props) => {
  const router = useRouter();
  const classes = useClass([css.button, props.className]);

  const route = (e) => {
    e.preventDefault();
    const href = linkify(props.text);
    router.push(href);
  };

  return (
    <button onClick={route} className={classes}>
      {props.text}
    </button>
  );
};

export default DroppedButton;
