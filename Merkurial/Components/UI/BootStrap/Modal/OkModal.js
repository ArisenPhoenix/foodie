import { Modal, Button } from "react-bootstrap";
import ReactPortal from "../../ReactPortal/ReactPortal";
import css from "./Modal.module.css";

const OkModal = (props) => {
  return (
    <ReactPortal wrapperId="react-portal-modal-container" className={css.modal}>
      <Modal show={props.show}>
        <Modal.Header closeButton onClick={props.handleOk}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleOk}>
            {props.okButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </ReactPortal>
  );
};

export default OkModal;
