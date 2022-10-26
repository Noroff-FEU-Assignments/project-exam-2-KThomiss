import Heading from "../../layout/Heading";
import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UpdateForm from "./UpdateForm";
import DeletePost from "./DeletePost";
import defaultAvatar from "../../../images/default.jpeg";
import Dropdown from "../../common/Dropdown";

function MyVerticallyCenteredModal(props) {
  const id = props.id;
  const title = props.title;
  const body = props.body;
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateForm id={id} title={title} body={body} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Update
                </Button>

                <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} id={post.id} title={post.title} body={post.body} />
              </div>
              <DeletePost id={post.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
