import css from "./FormLabelGroup.module.css";
import { useEffect, useState } from "react";
import React from "react";
import useToggle from "../../../../hooks/Toggle";

const FormLabelGroup = (props) => {
  const args = props.inputArgs;
  const startingvalue = args?.value ? args.value : null;
  const required = args?.required ? args.required : false;
  let type = args?.type ? args.type : "text";
  const on = args?.autocomplete ? "on" : "off";
  let labelText = props.text;
  const [value, setValue] = useState(startingvalue);
  const [using, setUsing] = useState(true);
  const [isRendered, _, setRendered] = useToggle(false, using);

  useEffect(() => {
    if (using) {
      if (!isRendered) {
        props && props.pullUpStates && props.pullUpStates(setValue);
        setRendered(true);
        setUsing(false);
      }
    }
  }, []);

  const updateData = (e) => {
    let updatedValue = e.target.value;
    if (props.inputArgs.limit) {
      const limit = props.inputArgs.limit;
      updatedValue = updatedValue.slice(0, limit);
      setValue(updatedValue);
    } else {
      setValue(updatedValue);
    }
    props.updateFormData({ [props.unCleanedText]: updatedValue });
  };

  return (
    <div className={css.div}>
      <label className={css.center}>
        {labelText} {required && <span> * </span>}
      </label>
      <br />
      <input
        placeholder={props.text}
        autoSave={true.toString()}
        type={type}
        required={required}
        autoComplete={on}
        className={css.center}
        onChange={updateData}
        value={value}
      />
    </div>
  );
};

export default FormLabelGroup;
