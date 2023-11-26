import css from "./Text.module.css";
import Caption from "./Caption";
import Paragraph from "./Paragraph";
import Heading from "./Heading";

const TextBox = (props) => {
  const classes = `${css.textBox} ${props.className}`;
  let type;
  switch (props.type) {
    case "paragraph":
      type = <Paragraph text={props.text} />;
      break;
    case "heading":
      type = <Heading text={props.text} />;
      break;

    default:
      type = <Caption text={props.text} />;
      break;
  }
  return <div className={classes}>{type}</div>;
};

export default TextBox;
