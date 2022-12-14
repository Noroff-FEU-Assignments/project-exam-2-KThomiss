import { useState } from "react";
import Heading from "../../layout/Heading";
import CreatePost from "./CreatePost";
import ModalVertical from "../../common/ModalVertical";
import PostsList from "./PostsList";
import ScrollToTop from "../../common/ScrollToTopOfPage";

export default function PostPage() {
  const [modalShowPost, setModalShowPost] = useState(false);
  document.title = `Posts | ToAd`;
  return (
    <div className="theme-page-container px-3">
      <div className="intro-container">
        <Heading title="Post-wall" />
        <Heading size={2} title="Look through the posts below or create your own." />
        <div className="d-flex justify-content-between">
          <button onClick={() => setModalShowPost(true)} className="cta-secondary create-new-btn">
            Create new post
          </button>
          <ScrollToTop />
        </div>
        <ModalVertical show={modalShowPost} onHide={() => setModalShowPost(false)} heading="Your Post">
          <CreatePost />
        </ModalVertical>
      </div>
      <PostsList />
    </div>
  );
}
