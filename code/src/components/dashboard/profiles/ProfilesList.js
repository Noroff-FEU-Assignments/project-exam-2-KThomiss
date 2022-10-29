import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import Heading from "../../layout/Heading";
import ErrorMessage from "../../common/ErrorMessage";
import { Link } from "react-router-dom";
import Avatar from "../../common/DefaultAvatar";
import Banner from "../../common/DefaultBanner";

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
      <div className="profile-list-container">
        {profiles.map((profile, index) => {
          return (
            <div key={index} className="profile-container">
              <Banner image={profile.banner} class={"profile-list-banner"}>
                <Avatar image={profile.avatar} class={"user-avatar profile-avatar"} alt={profile.name} />
              </Banner>
              <div className="profile-card-bottom">
                <h2>{profile.name}</h2>
                <span className="profile-email">{profile.email}</span>
                <div>
                  <ul>
                    <li>Posts: {profile._count.posts}</li>
                    <li>Followers: {profile._count.followers}</li>
                    <li>Following: {profile._count.following}</li>
                  </ul>
                </div>
                <Link to={`/profile/${profile.name}`} className="btn">
                  View profile
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

//style={{ backgroundImage: `url(${profile.image})` }}
