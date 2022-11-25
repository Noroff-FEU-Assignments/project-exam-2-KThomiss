import Heading from "../../layout/Heading";
import UserPosts from "./UserPosts";
import UserFollowing from "./UserFollowing";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import Avatar from "../../common/DefaultAvatar";
import Banner from "../../common/DefaultBanner";
import Dropdown from "./Dropdown";
import { useStore } from "../../../context/PostContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loading from "../../common/LoadingIndicator";

export default function UserProfile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [avatar, setAvatar] = useState();
  const [banner, setBanner] = useState();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { setUserPosts } = useStore();
  document.title = `${profile.name} | ToAd`;

  let { name } = useParams();

  const http = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await http.get(`profiles/${name}?_posts=true&_following=true&_followers=true`);
        if (response.status === 200) {
          setProfile(response.data);
          setAvatar(response.data);
          setBanner(response.data);
          setUserPosts(response.data.posts);
          setFollowers(response.data.followers);
          setFollowing(response.data.following);
        }
      } catch (error) {
        console.log("error", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getProfile();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div className="theme-page-container px-3">
      <div className="user-profile-container">
        <Banner image={banner.banner} class={"user-profile-banner"} />
        <div className="user-info-container d-flex mt-4 mb-5">
          <Avatar image={avatar.avatar} class={"user-avatar"} alt={profile.name} />
          <div className="flex-grow-1 mx-2 user-info">
            <Heading title={profile.name} />
            <span>{profile.email}</span>
            <Dropdown avatar={setAvatar} banner={setBanner} />
          </div>
          <div className="following-container d-flex flex-grow-1 justify-content-center gap-4 text-center align-self-center">
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
        <Row>
          <Col>
            <UserFollowing followers={followers} following={following} />
          </Col>
          <Col sm={12} md={7}>
            <UserPosts />
          </Col>
        </Row>
      </div>
    </div>
  );
}
