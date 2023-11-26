import { useClass } from "../../../../hooks/usehooks";
import SubmitButton from "../../Buttons/SubmitButton/SubmitButton";
import css from "./BasicForm.module.css";
const BasicForm = (props) => {
  const display = props.display && props.display
  const buttonClass = useClass([css.button, props.buttonClass]);
  const divClass = useClass([css.divClass, props.className]);
  const formClass = useClass([css.form, props.formClass]);
  return (
    <div className={divClass}>
      <form className={formClass} onSubmit={props.onSubmit} style={props.style && props.style}>
        {props.children}
        <div className={css.buttonDiv}>
          {props.children && <SubmitButton className={buttonClass} text={props.text} onSubmit={props?.onSubmit ? props.onSubmit : null}/>}
        </div>
      </form>
    </div>
  );
};

export default BasicForm;
