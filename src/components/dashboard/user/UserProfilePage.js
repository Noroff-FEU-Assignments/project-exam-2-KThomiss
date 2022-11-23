import Heading from "../../layout/Heading";
import { useState, useEffect } from "react";
import moment from "moment";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import DeletePost from "./DeletePost";
import Avatar from "../../common/DefaultAvatar";
import Banner from "../../common/DefaultBanner";
import Dropdown from "./Dropdown";
import ModalVertical from "../../common/ModalVertical";
import PostMedia from "../../common/PostMeida";
import { useStore } from "../../../context/PostContext";

export default function UserProfile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [avatar, setAvatar] = useState();
  const [banner, setBanner] = useState();
  const { state, setUserPosts } = useStore();
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
    return <div>...Loading</div>;
  }

  if (error) {
    return <ErrorMessage />;
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
      </div>
      <div className="m-1">
        {state.userPosts.map((post, index) => {
          return (
            <div key={index} className="posts-container content-container mt-4">
              <div>
                <h2>{post.title}</h2>
                <PostMedia image={post.media} />
                <p>{post.body}</p>
                <span>Published: {moment(post.created).format("DD MMM YY")}</span>
                <div className="d-flex gap-5">
                  <button
                    className="cta"
                    onClick={() => {
                      setModalData(post);
                      setModalShow(true);
                    }}
                  >
                    Update
                  </button>
                  <DeletePost id={post.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
        <UpdateForm id={modalData.id} title={modalData.title} body={modalData.body} />
      </ModalVertical>
    </div>
  );
}
