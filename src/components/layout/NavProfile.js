import { NavLink } from "react-router-dom";
import Avatar from "../common/DefaultAvatar";
import useLocalStorage from "../../hooks/useLocalStorage";
import useStore from "../../context/PostContext";
import { BASE_URL } from "../../constants/api";
import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";

export default function UserProfile() {
  const [auth] = useLocalStorage("auth");
  const [, setError] = useState(null);
  const { state, setUserAvatar } = useStore();

  const url = BASE_URL + `profiles/${auth.name}`;

  const http = useAxios();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await http.get(url);
        if (response.status === 200) {
          setUserAvatar(response.data.avatar);
        }
      } catch (error) {
        console.log("error", error);
        setError(error.toString());
      }
    }
    getProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <NavLink to={`/user/${auth.name}`} className="user-link d-flex flex-column">
      <Avatar image={state.userAvatar} class={"avatar"} alt={auth.name} />
      <span className="username">{auth.name}</span>
    </NavLink>
  );
}
