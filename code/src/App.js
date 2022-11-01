import HomePage from "./components/home/HomePage";
import NavLayout from "./components/layout/NavLayout";
import UserProfilePage from "./components/dashboard/user/UserProfilePage";
import PostPage from "./components/dashboard/posts/PostPage";
import PostDetails from "./components/dashboard/posts/PostDetails";
import ProfilesList from "./components/dashboard/profiles/ProfilesList";
import ProfileDetails from "./components/dashboard/profiles/ProfileDetails";
import CreatePost from "./components/dashboard/posts/CreatePost";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./sass/styles.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavLayout />
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/user/:name" element={<UserProfilePage />}></Route>
          <Route path="/posts" element={<PostPage />}></Route>
          <Route path="/posts/:id" element={<PostDetails />}></Route>
          <Route path="/profiles" element={<ProfilesList />}></Route>
          <Route path="/profile/:name" element={<ProfileDetails />}></Route>
          <Route path="/new-post" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
