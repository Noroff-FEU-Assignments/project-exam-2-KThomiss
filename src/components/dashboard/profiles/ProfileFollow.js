import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import PropTypes from "prop-types";

export default function ProfileFollow({ follow, count }) {
  let { name } = useParams();

  const http = useAxios();

  async function submitFollow() {
    try {
      const response = await http.put(`profiles/${name}/follow`);
      if (response.status === 200) {
        console.log(response);
        follow((curr) => [...curr, response.data]);
        count((curr) => curr + 1);
      }
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

ProfileFollow.propTypes = {
  follow: PropTypes.func.isRequired,
  count: PropTypes.func.isRequired,
};
