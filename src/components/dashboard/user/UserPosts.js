import { useState } from "react";
import moment from "moment";
import { useStore } from "../../../context/PostContext";
import Heading from "../../layout/Heading";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import PostMedia from "../../common/PostMeida";
import ModalVertical from "../../common/ModalVertical";

export default function UserPosts() {
  const { state } = useStore();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});

  return (
    <div className="p-1 user-posts-container">
      <Heading size={2} title="Posts" />
      {state.userPosts.map((post, index) => {
        return (
          <div key={index} className="posts-container content-container mt-4">
            <div>
              <h2>{post.title}</h2>
              <PostMedia image={post.media} />
              <p>{post.body}</p>
              <span>Published: {moment(post.created).format("DD MMM YY")}</span>
              <div className="d-flex gap-5">
                <button
                  className="cta"
                  onClick={() => {
                    setModalData(post);
                    setModalShow(true);
                  }}
                >
                  Update
                </button>
                <DeletePost id={post.id} />
              </div>
            </div>
          </div>
        );
      })}
      <ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
        <UpdatePost id={modalData.id} title={modalData.title} body={modalData.body} />
      </ModalVertical>
    </div>
  );
}
