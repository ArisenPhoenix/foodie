import css from "./NavButton.module.css";
import { useClass } from "../../../hooks/usehooks";
import { useRouter } from "next/router";
import React from "react";

const NavButton = (props) => {
  const router = useRouter();
  const isDropped = props.isDropped;
  const buttonClass = useClass([
    !isDropped ? css.navButtonDropped : css.navButton,
  ]);
  const route = (e) => {
    e.preventDefault();
    props?.onClick && props.onClick();
    router.push(props.href);
  };
  return (
    <button onClick={route} className={buttonClass}>
      {props.text}
    </button>
  );
};

export default NavButton;
