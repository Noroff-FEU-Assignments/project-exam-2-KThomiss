import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import PostMedia from "../../common/PostMeida";
import { ChatBubbleBottomCenterTextIcon, FaceSmileIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import { Link } from "react-router-dom";
import Loading from "../../common/LoadingIndicator";

export default function GetFollowers() {
  const [followers, setFollowers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();
  useEffect(() => {
    async function fetchFollowers() {
      try {
        const response = await http.get("posts/following?_author=true&_comments=true&_reactions=true");
        if (response.status === 200) {
          setFollowers(response.data);
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchFollowers();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>...Error occured</div>;
  }

  if (followers.length === 0) {
    return <div>No followers yet</div>; //update this with link and styling
  }

  return (
    <div className="posts-container following-container">
      {followers.map((follow) => {
        return (
          <div key={follow.id} className="posts-container content-container mt-5">
            <h2>{follow.title}</h2>
            <PostMedia image={follow.media} />
            <p>{follow.body}</p>
            <div className="d-flex gap-2">
              <span className="text-muted">{follow.author.name}:</span>
              <span className="text-muted">{moment(follow.created).format("DD MMM YY")}</span>
            </div>
            <div className="d-flex flex-end">
              <ChatBubbleBottomCenterTextIcon className="icon icon-comment" />
              <span className="post-count">{follow._count.comments}</span>
              <FaceSmileIcon className="icon icon-smile" />
              <span className="post-count">{follow._count.reactions}</span>
            </div>
            <div className="btn-container">
              <Link to={`/posts/${follow.id}`} className="cta post-cta">
                View Post
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
