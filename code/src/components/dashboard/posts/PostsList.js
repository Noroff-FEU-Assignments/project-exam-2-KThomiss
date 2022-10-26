import { BASE_URL } from "../../../constants/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const getUrl = BASE_URL + "posts";

export default function PostsList() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

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
    <div className="container">
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/dashboard/posts/${post.id}`}>View Post</Link>
          </div>
        );
      })}
    </div>
  );
}
