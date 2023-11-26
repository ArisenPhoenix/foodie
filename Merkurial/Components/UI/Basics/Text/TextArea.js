import css from "./TextArea.module.css";
import Frosty from "../../Cards/FrostedGlassDiv/Frosty"
import Label from "../INPUT_LABEL/Labels/Label";

const TextArea = (props) => {
  const classes = `${css.frosty} ${props.className}`;
  const spellCheck = props.spellCheck ? props.spellCheck : undefined;
  const resizable = props.resizable ? props.resizable : undefined;

  return (
    <Frosty className={css.frosty}>
      {props.label && <Label {...props.label}/>}
      <textarea
        onChange={props.onChange}
        className={classes}
        spellCheck={spellCheck}
        resizable={resizable}
        name={props.name}
        value={props.value}
        id={props.id}
        required={props.required}
      />
    </Frosty>
  );
};

export default TextArea;
