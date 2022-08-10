import Link from "../../../Link/Link";
const Button = (props) => {
  let classes;
  let type_;
  if (props.type === "main") {
    classes = `main navbar-text`;

    type_ = (
      <span
        // className={classes}
        onClick={props.onClick}
        name={props.name}
        id={props.id}
      >
        <Link
          className={classes}
          href={props.href}
          text={props.text}
          name={props.name}
          id={props.id}
        />
      </span>
    );
  } else if (props.type === "link") {
    classes = `${props.className} dropdown-item`;

    type_ = (
      <button
        name={props.name}
        id={props.id}
        data-rr-ui-dropdown-item
        className={classes}
        onClick={props.onClick ? props.onClick : null}
      >
        <Link
          href={props.href}
          text={props.text}
          onClick={props.onClick}
          name={props.name}
          id={props.id}
        />
      </button>
    );
  } else if (props.type === "action") {
    classes = `${props.className} button`;
    type_ = (
      <button
        onClick={props.onClick}
        className={classes}
        name={props.name}
        id={props.id}
      >
        {props.text}
      </button>
    );
  }

  return type_;
};

export default Button;
