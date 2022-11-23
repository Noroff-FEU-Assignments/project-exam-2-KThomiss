import Heading from "../../layout/Heading";
import CommentPost from "./CommentPost";
import ReactPost from "./ReactPost";
import PostMedia from "../../common/PostMeida";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useStore } from "../../../context/PostContext";

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
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPostDetails();
    // eslint-disable-next-line
  }, [url]);

  if (loading) {
    return <div>Loading...</div>; //add loading indicator
  }

  if (error) {
    return <div>Error: An error occured with the API call</div>; //add error component
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
            <>
              <span key={index}>{react.symbol}</span>
              <span>{react.count === 1 ? null : react.count}</span>
            </>
          );
        })}
        <div className="comment-container">
          {state.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <p className="p-1 m-1">
                  <b>{comment.owner}:</b> {comment.body}
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
