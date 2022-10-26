import Follow from "./ProfileFollow";
import Unfollow from "./ProfileUnfollow";
import Heading from "../../layout/Heading";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";

export default function ProfileDetails() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);

  let { name } = useParams();

  const http = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await http.get(`profiles/${name}?_posts=true&_following=true&_followers=true`);
        console.log("response", response);
        setProfile(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <ErrorMessage />;
  }
  return (
    <>
      <Heading title="Profile" />
      <div>
        <h2>{profile.name}</h2>
        <ul>
          <li>Posts: {profile._count.posts}</li>
          <li>Followers: {profile._count.followers}</li>
          <li>Following: {profile._count.following}</li>
        </ul>
      </div>
      <div>
        <Follow />
        <Unfollow />
      </div>
    </>
  );
}
