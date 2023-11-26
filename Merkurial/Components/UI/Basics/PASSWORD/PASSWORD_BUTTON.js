import { useClass } from "../../../../hooks/usehooks";
import css from "./passwordButton.module.css";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PASSWORD_BUTTON = (props) => {
  const iconClasses = useClass([css.iconClass]);
  const divClasses = useClass([css.buttonDiv, props.className]);
  return (
    <div type="button" className={divClasses} onClick={props.onClick}>
      <div className={css.buttonContainer}>
        <FontAwesomeIcon icon={faEye} className={iconClasses} />
      </div>
    </div>
  );
};

export default PASSWORD_BUTTON;
