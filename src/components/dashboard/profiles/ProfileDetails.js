import Follow from "./ProfileFollow";
import Unfollow from "./ProfileUnfollow";
import Heading from "../../layout/Heading";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import Banner from "../../common/DefaultBanner";
import Avatar from "../../common/DefaultAvatar";
import PostMedia from "../../common/PostMeida";

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
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <ErrorMessage>An error occured</ErrorMessage>;
  }

  return (
    <div className="user-profile-container">
      <div>
        <Banner image={profile.banner} class={"user-profile-banner"} />
        <div className="user-info-container d-flex mt-4">
          <Avatar image={profile.avatar} class={"user-avatar"} alt={profile.name} />
          <div className="px-3 flex-grow-1">
            <Heading title={profile.name} />
            <span className="text-muted">{profile.email}</span>
          </div>
          <div className="d-flex flex-grow-1 justify-content-center gap-4 text-center align-self-center">
            <div className="follow-feed">
              <span className="d-block count-follow-text">Followers</span>
              <span className="count-follow post-count">{profile._count.followers}</span>
            </div>
            <div className="follow-feed">
              <span className="d-block count-follow-text">Following</span>
              <span className="count-follow post-count">{profile._count.following}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex gap-5">
        <Follow />
        <Unfollow />
      </div>
      <div>
        {profile.posts.map((post, index) => {
          return (
            <div key={index}>
              <div className="posts-container">
                <h2>{post.title}</h2>
                <PostMedia image={post.media} />
                <p>{post.body}</p>
                <span>{post.created}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
