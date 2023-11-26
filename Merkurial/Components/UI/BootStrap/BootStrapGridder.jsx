import BootstrapContainer from "./BootStrapContainer";
import { Col, Row } from "react-bootstrap";
const BootStrapGridder = (props) => {

  return (
    <BootstrapContainer
      fluid={props.fluid ? props.fluid : null}
      className={props.containerClass}
    >
      <Row>
        {props.children}
      </Row>
    </BootstrapContainer>
  );
};

export default BootStrapGridder;

export const COLUMN = (props) => {
  return (
    <Col
      sm={props.sm}
      md={props.md}
      lg={props.lg}
      xlg={props.xlg}
      className={props.className}
      fluid={props.fluid ? props.fluid : null}
    >
      {props.children}
    </Col>
  );
};

export const ROW = (props) => {
  return (
    <Row
      sm={props.sm}
      md={props.md}
      lg={props.lg}
      xlg={props.xlg}
      className={props.className}
      fluid={props.fluid ? props.fluid : null}
    >
      {props.children}
    </Row>
  );
};
