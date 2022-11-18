import { useState } from "react";
import Heading from "../../layout/Heading";
import CreatePost from "./CreatePost";
import ModalVertical from "../../common/ModalVertical";
import PostsList from "./PostsList";

export default function PostPage() {
  const [modalShowPost, setModalShowPost] = useState(false);
  document.title = `Posts | ToAd`;
  return (
    <>
      <div className="container">
        <button onClick={() => setModalShowPost(true)} className="cta-secondary">
          Create new post
        </button>
        <ModalVertical show={modalShowPost} onHide={() => setModalShowPost(false)} heading="Your Post">
          <CreatePost />
        </ModalVertical>
      </div>
      <Heading title="Posts" />
      <PostsList />
    </>
  );
}
