import css from "./Text.module.css";

const Heading = (props) => {
  return <h3 className={css.heading}>{props.text}</h3>;
};

export default Heading;
