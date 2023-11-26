import css from "./SocialMediaButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SocialMediaButton = (props) => {
  const classes = `btn ${props.className} ${css.sizing}`;
  return (
    <a href={props.href} type="button" className={classes}>
      <FontAwesomeIcon className={`${css.sm}`} icon={props.icon} />
    </a>
  );
};

export default SocialMediaButton;
