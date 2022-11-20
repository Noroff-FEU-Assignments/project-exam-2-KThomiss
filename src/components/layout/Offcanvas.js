import { useState, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../../context/ThemeContext";

export default function NavOffcanvas(props) {
  const [show, setShow] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} className="nav-toggler">
        <Bars3Icon className="icon" />
      </button>
      <Offcanvas show={show} onHide={handleClose} placement="end" className={theme}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{props.children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
