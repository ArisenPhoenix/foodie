import css from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={css.button}>
      <button
        className="btn-lg lg-btn btn-primary btn"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        <h5>{props.text}</h5>
      </button>
    </div>
  );
};

export default Button;
