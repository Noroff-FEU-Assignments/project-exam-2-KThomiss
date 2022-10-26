import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

export default function ProfileUnfollow() {
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
  return <button onClick={submitUnfollow}>Unfollow</button>;
}
