import css from "./Text.module.css";

const Caption = (props) => {
  return <p className={css.caption}>{props.text}</p>;
};

export default Caption;
