import { Link } from "react-router-dom";
import defaultAvatar from "../../../images/default.jpeg";
export default function UserProfile() {
  const user = JSON.parse(localStorage.getItem("auth"));

  if (user.avatar === null) {
    user.avatar = defaultAvatar;
  }

  return (
    <Link to={`/user/${user.name}`} className="user-link">
      <img alt="avatar" src={user.avatar} className="avatar" />
      <span className="username">{user.name}</span>
    </Link>
  );
}
