import HomePage from "./components/home/HomePage";
import NavLayout from "./components/layout/NavLayout";
import UserProfilePage from "./components/dashboard/user/UserProfilePage";
import PostPage from "./components/dashboard/posts/PostPage";
import PostDetailsPage from "./components/dashboard/posts/PostDetailsPage";
import ProfilesPage from "./components/dashboard/profiles/ProfilesPage";
import ProfileDetailsPage from "./components/dashboard/profiles/ProfileDetailsPage";
import FollowersPage from "./components/dashboard/followers/FollowersPage";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import "./sass/styles.scss";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <AuthProvider>
      <div className={`theme-container ${theme}`}>
        <PostProvider>
          <Router>
            <NavLayout />
            <Routes>
              <Route path="/" exact element={<HomePage />}></Route>
              <Route path="/user/:name" element={<UserProfilePage />}></Route>
              <Route path="/posts" element={<PostPage />}></Route>
              <Route path="/posts/:id" element={<PostDetailsPage />}></Route>
              <Route path="/profiles" element={<ProfilesPage />}></Route>
              <Route path="/profile/:name" element={<ProfileDetailsPage />}></Route>
              <Route path="/followers" element={<FollowersPage />}></Route>
              <Route path="*" element={<HomePage />}></Route>
            </Routes>
          </Router>
        </PostProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
