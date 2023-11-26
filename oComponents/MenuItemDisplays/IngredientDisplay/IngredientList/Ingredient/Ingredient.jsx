import { Col } from "react-bootstrap";
import { Fragment } from "react";

const Ingredient = (props) => {
  return (
    <Fragment>
      <Col xs="6" md="4" lg="3" key={`Ingredient-Col-${Math.random()}`}>
        <p key={`Ingredient:${props.id}`} id={props.id}>
          {`${props.index+1}. ${props.ingredient}`}
        </p>
      </Col>
    </Fragment>
  );
};

export default Ingredient;
