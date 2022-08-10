import css from "./SubSection.module.css";

const SubSection = (props) => {
  const classes = `${css.text} ${props.className}`;
  return <h5 className={classes}>{props.text}</h5>;
};

export default SubSection;
