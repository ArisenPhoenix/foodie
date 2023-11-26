import { Fragment } from "react";
import css from "./Radial.module.css";

const Radial = (props) => {
  const classes = `${css.radialGroup} col`;
  return (
    <div className={css.radials}>
      <label className={css.label} htmlFor={props.name}>
        {props.text}
      </label>

      <input
        onChange={props.onChange}
        className={`${css.label}`}
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        checked={props.checked}
      />
    </div>
  );
};

export default Radial;
