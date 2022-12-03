import Heading from "../../layout/Heading";
import CommentPost from "./CommentPost";
import ReactPost from "./ReactPost";
import PostMedia from "../../common/PostMeida";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useStore } from "../../../context/PostContext";
import Loading from "../../common/LoadingIndicator";
import ErrorMessage from "../../common/ErrorMessage";

export default function PostDetails() {
  const { state, setDetails, setComments, setReactions } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);
  const [key, setKey] = useState("comment");

  let { id } = useParams();

  const url = BASE_URL + `posts/${id}?_author=true&_comments=true&_reactions=true`;

  useEffect(() => {
    async function getPostDetails() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const json = await response.json();
          setDetails(json);
          setComments(json.comments);
          setReactions(json.reactions);
        } else {
          setError("There was an error during the API request");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPostDetails();
    // eslint-disable-next-line
  }, [url]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div className="post-container my-5">
      <Heading title={`${state.details.author.name}'s post`} />
      <div className="post-inner-container content-container">
        <h2>{state.details.title}</h2>
        <PostMedia image={state.details.media} />
        <p className="post-details-body">{state.details.body}</p>
        {state.reactions.map((react, index) => {
          return (
            <span key={index}>
              <span>{react.symbol}</span>
              <span>{react.count === 1 ? null : react.count}</span>
            </span>
          );
        })}
        <div className="comment-container">
          {state.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p className="p-1 m-1">
                  <Link className="post-comment" to={`/profile/${comment.owner}`}>
                    {comment.owner}:
                  </Link>
                  {comment.body}
                </p>
              </div>
            );
          })}
        </div>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} justify className="mt-3">
          <Tab eventKey="comment" title="Comment">
            <CommentPost />
          </Tab>
          <Tab eventKey="react" title="React">
            <ReactPost />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
