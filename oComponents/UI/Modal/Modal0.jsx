import { Modal, Button } from "react-bootstrap";
// import { useState, useEffect, useRef } from "react";
import ReactPortal from "../ReactPortal/ReactPortal";
import css from "./Modal.module.css";

function Modal1(props) {
  //   const [show, setShow] = useState(true);
  //   const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <ReactPortal wrapperId="react-portal-modal-container" className={css.modal}>
      <Modal show={props.show}>
        <Modal.Header closeButton onClick={props.handleNo}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleNo}>
            {props.closeButton}
          </Button>
          <Button variant="primary" onClick={props.handleYes}>
            {props.okayButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </ReactPortal>
  );
}

export default Modal1;
