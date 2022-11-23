import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
/* import { useState } from "react";
import ErrorMessage from "../../common/ErrorMessage"; */

export default function ProfileUnfollow() {
  /*   const [message, setMessage] = useState("");
  const [error, setError] = useState(null); */
  let { name } = useParams();

  const http = useAxios();

  async function submitUnfollow() {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button onClick={submitUnfollow} className="cta-secondary delete">
      Unfollow
    </button>
  );
}

/*      <div>{error ? <ErrorMessage>{error.response.data.errors[0].message}</ErrorMessage> : <span className="success">{message}</span>}</div>*/
