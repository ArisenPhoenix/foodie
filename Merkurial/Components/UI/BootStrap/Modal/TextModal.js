import { Modal, Button } from "react-bootstrap";
import ReactPortal from "../../ReactPortal/ReactPortal";
import css from "./Modal.module.css";
import Input from "../../Basics/INPUT_LABEL/Inputs/Input"


const ModalButton = (props) => {
  return (
    <Button variant={props.variant} onClick={props.onClick}>
    {props.text}
    </Button>
  )
}


const TextModal = (props) => {
    return (
      <ReactPortal wrapperId="react-portal-modal-container" className={css.modal}>
        <Modal show={props.show}>
          <Modal.Header closeButton onClick={props.handleNo}>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input value={props.value} onChange={props.onChange} name={props.name}/>
          </Modal.Body>
          <Modal.Footer>
            <ModalButton variant="secondary" onClick={props.handleNo} text={props.closeButton} />
            <ModalButton variant="primary" onClick={props.handleYes} text={props.okayButton} />
          </Modal.Footer>
        </Modal>
      </ReactPortal>
    );
  };
  
  export default TextModal;



const Header = (props) => {
  {
    return props.title && (
      <Modal.Header closeButton onClick={props.onClick}>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      )
  }
}


const ModalInput = (props) => {
  return (
    <Modal.Body>
      <Input {...props.input} />
    </Modal.Body>
  )
}


export const SingleButtonTextModal = (props) => {
  const inputProps = {input: props.input, errorMsg: props.errorMsg}
    return (
      <ReactPortal wrapperId="react-portal-modal-container" className={css.modal}>
        <Modal show={props.show} onHide={props.close} keyboard >
          <Header title={props.title} onClick={props.close} />
          <ModalInput {...inputProps} />
          <Modal.Footer>
            
            <p className={css.error}>{props.errorMsg}</p>
            <ModalButton variant="primary" onClick={props.submit} text={props.text}/>
          </Modal.Footer>
        </Modal>
      </ReactPortal>
    );
  }
