import css from "./PageSection.module.css";

const PageSection = (props) => {
  const classes = `${css.section} `;
  return (
    <h2 className={classes}>
      {props.section === NaN || props.section === "NaN" ? "" : props.section}
    </h2>
  );
};

export default PageSection;
