import { useState} from "react";
import css from "./FormLabelGroup.module.css";

const SimpleFormLabelGroup = (props) => {
  const input = props.input;
  const label = props.label;
  const autocomplete = input.autoComplete ? "on" : "off";
  const autosave = input.autosave ? "true" : "false";
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const currentValue = e.target.value;
    const name = e.target.name;
    setInputValue(currentValue);
    const newObj = { [name]: inputValue };
    props.onChange && props.onChange(newObj);
  };

  return (
    <>
      <>
        <div className={css.div}>
          <label className={css.center}>
            {label.text ? label.text : props.text}{" "}
            {input.required && <span> * </span>}
          </label>
          <br />
          <input
            placeholder={input.text ? input.text : input.placeholder}
            autoSave={autosave.toString()}
            type={input.type}
            required={input.required}
            autoComplete={autocomplete}
            className={css.center}
            onChange={handleChange}
            value={inputValue}
            name={input.name}
          />
        </div>
      </>
    </>
  );
};

export default SimpleFormLabelGroup;
