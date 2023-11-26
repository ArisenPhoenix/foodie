import css from "./Label.module.css";
const Label = (props) => {
  const classes = `${css.label} ${props.className}`;
  return <label className={classes}>{props.text}</label>;
};

export default Label;
