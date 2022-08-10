import css from "./Paragraph.module.css";
const Paragraph = (props) => {
  const classes = `${css.font} ${props.className}`;
  return <p className={className}>{props.text}</p>;
};

export default Paragraph;
