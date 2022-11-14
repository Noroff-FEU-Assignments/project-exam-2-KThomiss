import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function ProfileFollow() {
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
