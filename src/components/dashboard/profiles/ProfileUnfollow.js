import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import PropTypes from "prop-types";

export default function ProfileUnfollow({ follow, count, followers }) {
  let { name } = useParams();

  const http = useAxios();

  function unFollow(name) {
    const newFollowers = followers.filter((f) => f.name !== name);
    follow(newFollowers);
  }

  async function submitUnfollow() {
    try {
      const response = await http.put(`profiles/${name}/unfollow`);

      if (response.status === 200) {
        unFollow(response.data.name);
        count((curr) => curr - 1);
      }
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

ProfileUnfollow.propTypes = {
  follow: PropTypes.func.isRequired,
  count: PropTypes.func.isRequired,
  followers: PropTypes.array.isRequired,
};
