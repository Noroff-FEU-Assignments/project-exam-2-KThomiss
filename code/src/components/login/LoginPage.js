import Heading from "../layout/Heading";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
function LoginPage() {
  return (
    <>
      <Heading title="Login" />
      <LoginForm />
      <Link to="/register">Dont have an account?</Link>
    </>
  );
}

export default LoginPage;
