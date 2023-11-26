import css from "./Bottom.module.css";
import { useClass } from "../../../hooks/usehooks";
import SocialMediaButton from "../../UI/Buttons/SocialMediaButton/SocialMediaButton";
import { faLine } from "@fortawesome/free-brands-svg-icons/faLine";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import React from "react";
import animations from "../../../CSS/Animations/pop.module.css"

const Bottom = (props) => {
  const icons = [
    {icon: faFacebookSquare, alt: "phone icon", href:"https://www.facebook.com", iconClass: css.iconClass, divClass: css.iconDiv + " " + css.facebook + " " + animations.pop},
    {icon: faPhone, alt: "facebook icon", href:"093 741 3777", iconClass: css.iconClass, divClass: css.iconDiv + " " + css.phone + " " + animations.pop},
    {icon: faLine, alt: "line icon", href:"marcureumm", iconClass: css.iconClass, divClass: css.iconDiv + " " + css.line + " " + animations.pop}
  ]
  
  const copyrightDate = new Date().getFullYear();
  const classes = useClass([props.className, css.bottomContainer]);
  return (
    <div className={css.bottom}>
    <div className={classes}>
      {icons.map((icon, index) => {
        return (
          <div className={css.buttonDiv} key={`${index}|${icon.alt}`}>
            <SocialMediaButton 
              icon={icon.icon}
              alt={icon.alt}
              href={icon.href}
              divClass={icon.divClass}
              iconClass={icon.iconClass}
            />
          </div>
        )
      })}
      <div className={`${css.copyrightDiv}`}>
        <p className={css.date}>copyright {copyrightDate}</p>
        <p className={css.date}>www 🎲 merkurialphoenix 🎲 com</p>
      </div>
    </div>
    </div>
  );
};

export default Bottom;
