import { Container } from "react-bootstrap";
import css from "./Container.module.css";

const Container_ = (props) => {
  return <Container className={css.height}>{props.children}</Container>;
};

export default Container_;
