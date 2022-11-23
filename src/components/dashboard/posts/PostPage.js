import { useState } from "react";
import Heading from "../../layout/Heading";
import CreatePost from "./CreatePost";
import ModalVertical from "../../common/ModalVertical";
import PostsList from "./PostsList";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";

export default function PostPage() {
  const [modalShowPost, setModalShowPost] = useState(false);
  document.title = `Posts | ToAd`;
  return (
    <div className="theme-page-container px-3">
      <div className="post-intro-container intro-container">
        <Heading title="Post-wall" />
        <h2>Look through the posts below or create your own.</h2>
        <div className="d-flex justify-content-between">
          <button onClick={() => setModalShowPost(true)} className="cta-secondary create-new-btn">
            Create new post
          </button>
          <a href="#top">
            <ArrowUpCircleIcon className="icon" />
          </a>
        </div>
        <ModalVertical show={modalShowPost} onHide={() => setModalShowPost(false)} heading="Your Post">
          <CreatePost />
        </ModalVertical>
      </div>
      <PostsList />
    </div>
  );
}
