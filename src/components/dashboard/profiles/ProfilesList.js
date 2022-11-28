import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import ErrorMessage from "../../common/ErrorMessage";
import { Link } from "react-router-dom";
import Avatar from "../../common/DefaultAvatar";
import Heading from "../../layout/Heading";
/* import Banner from "../../common/DefaultBanner"; */
import Loading from "../../common/LoadingIndicator";

export default function ProfilesList() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  const http = useAxios();

  useEffect(() => {
    async function getProfiles() {
      try {
        const response = await http.get("profiles/");
        if (response.status === 200) {
          setProfiles(response.data);
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfiles();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="profile-list-container">
      {profiles.map((profile, index) => {
        return (
          <div key={index} className="profile-container content-container">
            <div className="d-grid place-items-center align-items-center text-center px-2 py-5">
              <Avatar image={profile.avatar} class={"user-avatar profile-avatar"} alt={profile.name} />
              <Heading size={2} title={profile.name} />
              <span className="profile-email">{profile.email}</span>
              <div className="d-flex justify-content-around text-center pt-2 profile-card-bottom">
                <div>
                  <span className="count-profile post-count">{profile._count.followers}</span>
                  <span className="d-block count-follow-text count-profile-text">Followers</span>
                </div>
                <div>
                  <span className="count-profile post-count">{profile._count.posts}</span>
                  <span className="d-block count-follow-text count-profile-text">Posts</span>
                </div>
                <div>
                  <span className="count-profile post-count">{profile._count.following}</span>
                  <span className="d-block count-follow-text count-profile-text">Following</span>
                </div>
              </div>
              <div className="mx-4">
                <Link to={`/profile/${profile.name}`} className="cta post-cta">
                  View profile
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/*      {profiles.map((profile, index) => {
        return (
          <div key={index} className="profile-container content-container">
            <Banner image={profile.banner} class={"profile-list-banner"}>
              <Avatar image={profile.avatar} class={"user-avatar profile-avatar"} alt={profile.name} />
            </Banner>
            <div className="profile-card-bottom">
              <h2>{profile.name}</h2>
              <span className="profile-email d-block pb-2">{profile.email}</span>
              <div className="d-flex justify-content-around text-center pb-4 pt-2">
                <div>
                  <span className="count-follow post-count">{profile._count.followers}</span>
                  <span className="d-block count-follow-text">Followers</span>
                </div>
                <div>
                  <span className="count-follow post-count">{profile._count.posts}</span>
                  <span className="d-block count-follow-text">Following</span>
                </div>
                <div>
                  <span className="count-follow post-count">{profile._count.following}</span>
                  <span className="d-block count-follow-text">Following</span>
                </div>
              </div>
              <Link to={`/profile/${profile.name}`} className="cta post-cta">
                View profile
              </Link>
            </div>
          </div>
        );
      })}*/
