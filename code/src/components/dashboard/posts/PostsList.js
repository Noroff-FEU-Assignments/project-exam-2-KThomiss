import { BASE_URL } from "../../../constants/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import PostMedia from "../../common/PostMeida";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChatBubbleBottomCenterTextIcon, FaceSmileIcon } from "@heroicons/react/20/solid";

const getUrl = BASE_URL + "posts";

export default function PostsList() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    async function GetPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(getUrl, options);
        const json = await response.json();
        console.log(json);
        setPosts(json);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    GetPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>Error</div>;

  return (
    <Row className="row-post-list">
      <Col xs={12} md={2} className="column-left">
        Search and tags
      </Col>
      <Col md={8} className="column-middle">
        <div className="postlist-container">
          {posts.map((post) => {
            return (
              <div key={post.id} className="posts-container">
                <h2>{post.title}</h2>
                <PostMedia image={post.media} />
                <p>{post.body}</p>
                <span>{post.created}</span>
                <div className="d-flex flex-end">
                  <ChatBubbleBottomCenterTextIcon className="icon icon-comment" />
                  <span className="post-count">{post._count.comments}</span>
                  <FaceSmileIcon className="icon icon-smile" />
                  <span className="post-count">{post._count.reactions}</span>
                </div>
                <div className="btn-container">
                  <Link to={`/posts/${post.id}`} className="cta post-cta">
                    View Post
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Col>
    </Row>
  );
}
