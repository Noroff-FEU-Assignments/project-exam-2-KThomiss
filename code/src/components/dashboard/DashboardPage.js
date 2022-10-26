import Heading from "../layout/Heading";
import useLocalStorage from "../../hooks/useLocalStorage";
import PostsList from "./posts/PostsList";

export default function DashboardPage() {
  const [user] = useLocalStorage("auth");

  return (
    <>
      <Heading title="Dashboard" />
      <div>Welcome: {user.name}</div>
      <PostsList />
    </>
  );
}
