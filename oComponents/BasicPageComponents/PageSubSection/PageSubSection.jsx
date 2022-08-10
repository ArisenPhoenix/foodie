import css from "./PageSubSection.module.css";

const PageSubSection = (props) => {
  const classes = `${css.text} ${props.className}`;
  return (
    <h3 className={classes} id={`SubSection:${props.text}`}>
      {props.text}
    </h3>
  );
};

export default PageSubSection;
