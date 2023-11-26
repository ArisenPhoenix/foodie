import { Modal } from "react-bootstrap";
import ReactPortal from "../../ReactPortal/ReactPortal";
import css from "./Modal.module.css";
import OutsideAlerter from "../../../../hooks/useOutsideAlerter";

const InfoModal = (props) => {
  const hasHref = () => {
    return props.title.includes("https://www.");
  };

  const fillerFunc = () => {};

  return (
    <ReactPortal wrapperId="react-portal-modal-container" className={css.modal}>
      <OutsideAlerter setToFalse={hasHref() ? fillerFunc : props.setToFalse}>
        <Modal show={props.show}>
          <Modal.Header closeButton onClick={props.handleOk}>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.message}</Modal.Body>
        </Modal>
      </OutsideAlerter>
    </ReactPortal>
  );
};

export default InfoModal;
