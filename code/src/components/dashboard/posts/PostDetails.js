import Heading from "../../layout/Heading";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { UpdateContext } from "../../../context/UpdateContext";
import CommentPost from "./CommentPost";
import ReactPost from "./ReactPost";
import PostMedia from "../../common/PostMeida";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function PostDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);
  const { comments, setComments } = useContext(UpdateContext);
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
        const json = await response.json();
        console.log(json);
        setDetails(json);
        setComments(json.comments);
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
    return <div>Error: An error occured</div>; //add error component
  }

  return (
    <div className="post-container container">
      <Heading title={`${details.author.name}'s post`} />
      <div className="post-inner-container">
        <h2>{details.title}</h2>
        <PostMedia image={details.media} />
        <p className="post-details-body">{details.body}</p>
        {details.reactions.map((react, index) => {
          return (
            <span key={index}>
              {react.symbol}
              {react.count}
            </span>
          );
        })}
        <div className="comment-container">
          {comments.map((comment, index) => {
            return (
              <div key={index}>
                <span>
                  {comment.owner}: {comment.body}
                </span>
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

/*          {details.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <span>
                  {comment.owner}: {comment.body}
                </span>
              </div>
            );
          })}*/
