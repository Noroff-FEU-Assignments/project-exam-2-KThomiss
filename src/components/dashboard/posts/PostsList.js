import { useStore } from "../../../context/PostContext";
import { Link } from "react-router-dom";
import PostMedia from "../../common/PostMeida";
import { ChatBubbleBottomCenterTextIcon, FaceSmileIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import Loading from "../../common/LoadingIndicator";
import ErrorMessage from "../../common/ErrorMessage";

export default function PostsList() {
  const { state } = useStore();

  if (state.loading) {
    return <Loading />;
  }

  if (state.error) {
    return <ErrorMessage>{state.error}</ErrorMessage>;
  }

  return (
    <div className="postlist-container">
      {state.posts.map((post) => {
        return (
          <div key={post.id} className="posts-container content-container mt-5">
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
  );
}
