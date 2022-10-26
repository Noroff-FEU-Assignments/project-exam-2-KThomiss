import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavProfile from "../dashboard/user/NavProfile";

function Layout() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    navigate("/");
  };
  return (
    <header>
      <div className="logo-container">Logo</div>
      <nav>
        <NavLink end to="/">
          Home
        </NavLink>
        {auth ? (
          <>
            <div className="admin-container">
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/profiles">Profiles</NavLink>
              <NavLink to="/new-post">New post</NavLink>
            </div>
            <div className="user-container">
              <NavProfile />
              <button onClick={logout}>Log out</button>
            </div>
          </>
        ) : (
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Layout;
