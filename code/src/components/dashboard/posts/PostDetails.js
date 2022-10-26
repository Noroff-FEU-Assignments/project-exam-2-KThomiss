import Heading from "../../layout/Heading";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import CommentPost from "./CommentPost";
import ReactPost from "./ReactPost";

export default function PostDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

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
      } catch (error) {
        setError(error.toString());
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPostDetails();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>; //add loading indicator
  }

  if (error) {
    return <div>Error: An error occured</div>; //add error component
  }

  return (
    <div className="container">
      <Heading title="Post details" />
      <div key={details.id}>
        <h2>{details.title}</h2>
        <p>{details.body}</p>
        <div className="comment-container">
          {details.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <span>{comment.owner}: </span>
                {comment.body}
              </div>
            );
          })}
          <CommentPost />
        </div>
        <div className="react-container">
          {details.reactions.map((react, index) => {
            return <div key={index}>{react.symbol}</div>;
          })}
          <ReactPost />
        </div>
      </div>
    </div>
  );
}
