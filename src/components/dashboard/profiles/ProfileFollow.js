import { useParams } from "react-router-dom";
/* import { useState } from "react"; */
import useAxios from "../../../hooks/useAxios";
/* import ErrorMessage from "../../common/ErrorMessage"; */

export default function ProfileFollow() {
  /*   const [message, setMessage] = useState("");
  const [error, setError] = useState(null); */
  let { name } = useParams();

  const http = useAxios();

  async function submitFollow() {
    try {
      const response = await http.put(`profiles/${name}/follow`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={submitFollow} className="cta">
      Follow
    </button>
  );
}

/*<div>{error ? <ErrorMessage>{error.response.data.errors[0].message}</ErrorMessage> : <span className="success">{message}</span>}</div>*/
