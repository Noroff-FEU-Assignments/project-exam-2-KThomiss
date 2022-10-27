import Heading from "../../layout/Heading";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
/* import Button from "react-bootstrap/Button"; */
import UpdateForm from "./UpdateForm";
import DeletePost from "./DeletePost";
import defaultAvatar from "../../../images/default.jpeg";
import Dropdown from "../../common/Dropdown";
import ModalVertical from "../../common/ModalVertical";

export default function UserProfile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  let { name } = useParams();

  const http = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await http.get(`profiles/${name}?_posts=true&_following=true&_followers=true`);
        console.log(response.data);
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
    return <ErrorMessage />;
  }

  if (profile.avatar === null) {
    profile.avatar = defaultAvatar;
  }

  return (
    <div className="container">
      <img src={profile.banner} alt="banner" className="banner" />
      <div>
        <Heading title={profile.name} />
        <Dropdown />
        <img src={profile.avatar} alt="avatar" className="avatar user-avatar" />
      </div>
      <li>
        Followers: {profile._count.followers} / Following: {profile._count.following}
      </li>
      <li>Total posts: {profile._count.posts}</li>
      <div>
        {profile.posts.map((post, index) => {
          return (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <span>{post.owner}</span>
              <div>
                <button variant="primary" onClick={() => setModalShow(true)}>
                  Update
                </button>
                <ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
                  <UpdateForm id={post.id} title={post.title} body={post.body} />
                </ModalVertical>
              </div>
              <DeletePost id={post.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
