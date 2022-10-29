import Dropdown from "react-bootstrap/Dropdown";
import Banner from "../dashboard/user/UpdateBanner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateBanner(props) {
  const name = props.name;
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Banner name={name} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function BasicExample() {
  const [modalShow, setModalShow] = useState(false);

  let { name } = useParams();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
          <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Banner
            </Button>

            <UpdateBanner show={modalShow} onHide={() => setModalShow(false)} name={name} />
          </div>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
