import css from "./PageTitle.module.css";
const PageTitle = (props) => {
  const classes = `${css.font} ${props.className}`;
  return (
    <h1
      className={classes}
      contentEditable={props.contentEditable}
      suppressContentEditableWarning={true}
    >
      {props.title}
    </h1>
  );
};

export default PageTitle;
