import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ModalVertical(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <Modal {...props} className={theme} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}

ModalVertical.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
