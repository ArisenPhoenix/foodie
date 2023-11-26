import css from "./Card.module.css";
import { Card } from "react-bootstrap";

const Card_ = (props) => {
  const classes = `${css.card} ${props.className}`;
  return (
    <Card
      className={classes}
      id={props.id}
      onClick={props.onClick ? props.onClick : null}
    >
      {props.children}
    </Card>
  );
};

export default Card_;
