import Follow from "./ProfileFollow";
import Unfollow from "./ProfileUnfollow";
import Heading from "../../layout/Heading";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams, Link } from "react-router-dom";
import Banner from "../../common/DefaultBanner";
import Avatar from "../../common/DefaultAvatar";
import PostMedia from "../../common/PostMeida";
import UserFollowing from "../user/UserFollowing";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import { EyeIcon } from "@heroicons/react/20/solid";
import Loading from "../../common/LoadingIndicator";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function ProfileDetails() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [countFollowers, setCountFollowers] = useState(0);
  const [following, setFollowing] = useState([]);
  const [countFollowing, setCountFollowing] = useState(0);
  const [auth] = useLocalStorage("auth");

  let { name } = useParams();

  const http = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await http.get(`profiles/${name}?_posts=true&_following=true&_followers=true`);
        if (response.status === 200) {
          console.log(response.data);
          setProfile(response.data);
          setFollowers(response.data.followers);
          setCountFollowers(response.data._count.followers);
          setFollowing(response.data.following);
          setCountFollowing(response.data._count.following);
        }
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
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const isFollowing = followers.map((follow) => {
    return follow.name;
  });

  const iFollow = isFollowing.includes(auth.name);

  return (
    <div className="user-profile-container">
      <div>
        <Banner image={profile.banner} class={"user-profile-banner"} />
        <div className="user-info-container align-items-end d-flex mt-4">
          <Avatar image={profile.avatar} class={"user-avatar"} alt={profile.name} />
          <div className="px-3 flex-grow-1">
            <Heading title={profile.name} />
            <span className="text-muted">{profile.email}</span>
          </div>
          <div className="d-flex flex-grow-1 justify-content-center gap-4 text-center align-self-end flex-column">
            <div className="d-flex justify-content-around">
              <div className="follow-feed">
                <span className="d-block count-follow-text">Followers</span>
                <span className="count-follow post-count">{countFollowers}</span>
              </div>
              <div className="follow-feed">
                <span className="d-block count-follow-text">Following</span>
                <span className="count-follow post-count">{countFollowing}</span>
              </div>
            </div>
            <div>{iFollow ? <Unfollow follow={setFollowers} followers={followers} count={setCountFollowers} /> : <Follow follow={setFollowers} count={setCountFollowers} />}</div>
          </div>
        </div>
      </div>
      <Row className="mt-4 gap-5 width">
        <Col>
          <UserFollowing followers={followers} following={following} />
        </Col>
        <Col sm={12} md={6}>
          <Heading size={2} title="Posts" />
          {profile.posts.map((post, index) => {
            return (
              <div key={index}>
                <div className="posts-container content-container">
                  <div className="d-flex justify-content-between align-items-center">
                    <Heading size={3} title={post.title} />
                    <Link to={`/posts/${post.id}`}>
                      <EyeIcon className="icon-sm" />
                    </Link>
                  </div>
                  <PostMedia image={post.media} />
                  <p>{post.body}</p>
                  <span className="text-muted">Created: {moment(post.created).format("DD MMM YY")}</span>
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
