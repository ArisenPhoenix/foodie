import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
const BootstrapGridder = (props) => {
  let colWidths = " sm md lg xl";
  if ((props.colWidths !== "") & (props.colWidths !== undefined)) {
    colWidths = props.colWidths;
  }

  return (
    <Container fluid={props.fluid ? props.fluid : null}>
      <Row>{props.children}</Row>
    </Container>
  );
};

export default BootstrapGridder;
