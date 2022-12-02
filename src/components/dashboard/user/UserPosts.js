import { useState } from "react";
import moment from "moment";
import { useStore } from "../../../context/PostContext";
import Heading from "../../layout/Heading";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import PostMedia from "../../common/PostMeida";
import ModalVertical from "../../common/ModalVertical";
import { Link } from "react-router-dom";
import { ArrowUpCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function UserPosts() {
  const { state } = useStore();
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [toggle, setToggle] = useState(true);

  return (
    <div className="p-1 user-posts-container m-auto">
      <div className="d-flex align-items-end gap-2">
        <Heading size={2} title="Posts" />
        <span onClick={() => setToggle(!toggle)}>{toggle === true ? <EyeSlashIcon className="icon" /> : <EyeIcon className="icon" />}</span>
      </div>
      {toggle && (
        <>
          {state.userPosts.map((post, index) => {
            return (
              <div key={index} className="posts-container content-container mt-4">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Heading size={3} title={post.title} />
                    <Link to={`/posts/${post.id}`}>
                      <ArrowUpCircleIcon className="icon-sm" />
                    </Link>
                  </div>
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
        </>
      )}

      <ModalVertical show={modalShow} onHide={() => setModalShow(false)} heading="Update post">
        <UpdatePost id={modalData.id} title={modalData.title} body={modalData.body} />
      </ModalVertical>
    </div>
  );
}
