import css from "./Text.module.css";

const Heading = (props) => {
  const classes = `${css.heading} ${props.className}`;
  return <h2 className={classes}>{props.text}</h2>;
};

export default Heading;
