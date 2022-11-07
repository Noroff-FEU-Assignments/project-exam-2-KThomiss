import Heading from "../../layout/Heading";
import PostsList from "./PostsList";

export default function PostPage() {
  document.title = `Posts | ToAd`;
  return (
    <>
      <Heading title="Posts" />
      <PostsList />
    </>
  );
}
