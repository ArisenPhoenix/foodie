import css from "./Text.module.css";

const Paragraph = (props) => {
  return <p className={css.paragraph}>{props.text}</p>;
};

export default Paragraph;
