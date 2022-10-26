import HomePage from "./components/home/HomePage";
/* import Layout from "./components/layout/Layout"; */
import BootstrapNav from "./components/layout/BootstrapNav";
import LoginPage from "./components/login/LoginPage";
import RegisterForm from "./components/login/RegisterForm";
import UserProfilePage from "./components/dashboard/user/UserProfilePage";
import DashboardPage from "./components/dashboard/DashboardPage";
import PostDetails from "./components/dashboard/posts/PostDetails";
import ProfilesList from "./components/dashboard/profiles/ProfilesList";
import ProfileDetails from "./components/dashboard/profiles/ProfileDetails";
import CreatePost from "./components/dashboard/posts/CreatePost";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <BootstrapNav />
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/user/:name" element={<UserProfilePage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/dashboard/posts/:id" element={<PostDetails />}></Route>
          <Route path="/profiles" element={<ProfilesList />}></Route>
          <Route path="/profile/:name" element={<ProfileDetails />}></Route>
          <Route path="/new-post" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
