import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import Heading from "../../layout/Heading";
import ErrorMessage from "../../common/ErrorMessage";
import { Link } from "react-router-dom";

export default function ProfilesList() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  const http = useAxios();

  useEffect(() => {
    async function getProfiles() {
      try {
        const response = await http.get("profiles/");
        console.log("response", response);
        setProfiles(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <ErrorMessage />;

  return (
    <>
      <Heading title="User profiles" />
      {profiles.map((profile, index) => {
        return (
          <div key={index}>
            <h2>{profile.name}</h2>
            <h3>{profile.email}</h3>
            <div>
              <ul>
                <li>{profile._count.posts}</li>
                <li>{profile._count.followers}</li>
                <li>{profile._count.following}</li>
              </ul>
            </div>
            <Link to={`/profile/${profile.name}`}>View profile</Link>
          </div>
        );
      })}
    </>
  );
}
