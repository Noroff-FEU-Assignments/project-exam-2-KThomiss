import Heading from "../../layout/Heading";
import PostsList from "./PostsList";
/* import useLocalStorage from "../../../hooks/useLocalStorage"; */

export default function DashboardPage() {
  /* const [user] = useLocalStorage("auth"); */

  return (
    <>
      <Heading title="Dashboard" />
      <PostsList />
    </>
  );
}
