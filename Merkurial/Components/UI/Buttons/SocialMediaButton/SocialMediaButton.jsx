import css from "./SocialMediaButton.module.css";
import { useRouter } from "next/router";
import { useClass } from "../../../../hooks/usehooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialMediaButton = (props) => {
  const router = useRouter();

  const route = () => {
    router.push(props.href);
  };

  const divClass = useClass([css.divClass, props.divClass]);
  return (
    <div
      href={props.href}
      type="button"
      className={divClass}
      onClick={props.onClick ? props.onClick : route}
    >
      <FontAwesomeIcon icon={props.icon} className={props.iconClass} />
    </div>
  );
};

export default SocialMediaButton;
