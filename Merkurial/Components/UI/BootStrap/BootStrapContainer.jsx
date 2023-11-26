import Container from "react-bootstrap/Container";

const BootstrapContainer = (props) => {
  return (
    <Container
      className={props.className}
      fluid={props.fluid ? props.fluid : false}
      bsPrefix={props.bsPrefix ? props.bsPrefix : "container"}
      as={props.as ? props.as : "div"}
    >
      {props.children}
    </Container>
  );
};

export default BootstrapContainer;
