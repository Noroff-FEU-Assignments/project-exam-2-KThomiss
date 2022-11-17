import { useStore } from "../../../context/PostContext";
import { Link } from "react-router-dom";
import PostMedia from "../../common/PostMeida";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ChatBubbleBottomCenterTextIcon, FaceSmileIcon } from "@heroicons/react/20/solid";
import moment from "moment";

export default function PostsList() {
  const { state } = useStore();

  console.log("state", state);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>{state.error}</div>;
  }

  return (
    <div className="container post-list-container">
      <Row className="row-post-list">
        <Col xs={12} md={2} className="column-left sticky-md-top">
          Searchbar and tags
        </Col>
        <Col md={8} className="column-middle">
          <div className="postlist-container">
            {state.posts.map((post) => {
              return (
                <div key={post.id} className="posts-container">
                  <h2>{post.title}</h2>
                  <PostMedia image={post.media} />
                  <p>{post.body}</p>
                  <div className="d-flex gap-2">
                    <span className="text-muted">{post.author.name}:</span>
                    <span className="text-muted">{moment(post.created).format("DD MMM YY")}</span>
                  </div>
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
    </div>
  );
}
