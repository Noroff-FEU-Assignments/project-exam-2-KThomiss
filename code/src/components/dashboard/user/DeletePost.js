import useAxios from "../../../hooks/useAxios";
import Alert from "react-bootstrap/Alert";
/* import Button from "react-bootstrap/Button"; */
import { useState } from "react";

export default function DeletePost({ id }) {
  const http = useAxios();
  const [show, setShow] = useState(false);

  async function deletePost() {
    try {
      const response = await http.delete(`posts/${id}`);
      console.log("response", response);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <>
      <Alert variant="warning" show={show}>
        <Alert.Heading>This post will be deleted forever.</Alert.Heading>
      </Alert>
      <button
        className="cta-secondary delete"
        onClick={() => {
          deletePost();
          setShow(true);
        }}
      >
        Delete
      </button>
    </>
  );
}
