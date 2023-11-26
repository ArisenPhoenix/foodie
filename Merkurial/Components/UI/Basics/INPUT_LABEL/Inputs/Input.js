import { VERIFY_VALUE } from "../../../../../Helpers/Verifications/verify";

const Input = (props) => {
  const handleClick = (e) => {
    if (props.onClick || props.onDoubleClick){
      switch (e.detail){
        case 1: 
          return props.onClick ? props.onClick : () => {}
        case 2:
          return props.onDoubleClick ? props.onDoubleClick() : props.onClick ? props.onClick() : () => {}
        default:
          null
      }
    }
  }
  
  return (
    <input
      className={VERIFY_VALUE(props.className, "")}
      value={VERIFY_VALUE(props.value, "")}
      placeholder={VERIFY_VALUE(props.placeholder, "")}
      ref={props.ref}
      required={VERIFY_VALUE(props.required, null)}
      type={VERIFY_VALUE(props.type, "text")}
      onChange={VERIFY_VALUE(props.onChange, () => {})}
      name={VERIFY_VALUE(props.name)}
      readOnly={VERIFY_VALUE(props.readOnly, false)}
      hidden={VERIFY_VALUE(props.hidden)}
      autoComplete={VERIFY_VALUE(props.autoComplete, null)}
      onClick={handleClick}
      step={VERIFY_VALUE(props.type == "number" ? props.step : undefined, "1")}
      min={props.type == "number" ? props.min : null}
      max={props.type == "number" ? props.max : null}
      onBlur={props.onBlur ? props.onBlur : () => {}}
    />
  );
};

export default Input;
