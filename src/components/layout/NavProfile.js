import { Link } from "react-router-dom";
import Avatar from "../common/DefaultAvatar";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function UserProfile() {
  const [auth] = useLocalStorage("auth");

  return (
    <Link to={`/user/${auth.name}`} className="user-link d-flex flex-column">
      <Avatar image={auth.avatar} class={"avatar"} alt={auth.name} />
      <span className="username">{auth.name}</span>
    </Link>
  );
}
