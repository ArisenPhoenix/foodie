import css from "./PageSubSectionHeader.module.css";

const PageSubSectionHeader = (props) => {
  const classes = `${css.heading} ${props.className}`;
  return <h3 className={classes}>{props.text}</h3>;
};

export default PageSubSectionHeader;
