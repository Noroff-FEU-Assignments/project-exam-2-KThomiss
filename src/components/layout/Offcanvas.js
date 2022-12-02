import { useState, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../../context/ThemeContext";
import PropTypes from "prop-types";

export default function NavOffcanvas(props) {
  const [show, setShow] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} className="nav-toggler">
        <Bars3BottomRightIcon className="icon" />
      </button>
      <Offcanvas show={show} onHide={handleClose} placement="end" className={theme}>
        <Offcanvas.Header>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
          <button type="button" className="offcanvas-close" aria-label="Close" onClick={() => setShow(false)}>
            <XMarkIcon className="icon" />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body onClick={() => setShow(false)}>{props.children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

NavOffcanvas.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
