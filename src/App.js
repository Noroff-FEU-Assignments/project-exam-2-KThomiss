import HomePage from "./components/home/HomePage";
import NavLayout from "./components/layout/NavLayout";
import UserProfilePage from "./components/dashboard/user/UserProfilePage";
import PostPage from "./components/dashboard/posts/PostPage";
import PostDetails from "./components/dashboard/posts/PostDetails";
import ProfilesPage from "./components/dashboard/profiles/ProfilesPage";
import ProfileDetails from "./components/dashboard/profiles/ProfileDetails";
import CreatePost from "./components/dashboard/posts/CreatePost";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import "./sass/styles.scss";

function App() {
  const [theme] = useContext(ThemeContext);
  return (
    <ThemeContextProvider>
      <div className="app" id={theme}>
        <AuthProvider>
          <PostProvider>
            <Router>
              <NavLayout />
              <Routes>
                <Route path="/" exact element={<HomePage />}></Route>
                <Route path="/user/:name" element={<UserProfilePage />}></Route>
                <Route path="/posts" element={<PostPage />}></Route>
                <Route path="/posts/:id" element={<PostDetails />}></Route>
                <Route path="/profiles" element={<ProfilesPage />}></Route>
                <Route path="/profile/:name" element={<ProfileDetails />}></Route>
                <Route path="/new-post" element={<CreatePost />}></Route>
                <Route path="*" element={<HomePage />}></Route>
              </Routes>
            </Router>
          </PostProvider>
        </AuthProvider>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
