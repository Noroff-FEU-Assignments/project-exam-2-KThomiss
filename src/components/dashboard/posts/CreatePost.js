import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";
import useStore from "../../../context/PostContext";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter your message"),
  image: yup.string().required("Please an image url"),
});

export default function CreatePost() {
  const [, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [message, setMessage] = useState("");
  const { state, addPost } = useStore();

  console.log("posts", state);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  async function postComment(data) {
    setSubmitting(true);
    setPostError(null);
    setMessage("Post submitted");
    reset();

    const title = data.title;
    const message = data.body;
    const image = data.image;

    const formData = {
      title: title,
      body: message,
      media: image,
    };

    try {
      const response = await http.post(`posts`, JSON.stringify(formData));
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        addPost(response.data);
      }
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Heading title="Create a new post" />
      <form onSubmit={handleSubmit(postComment)} className="mt-5">
        {postError && <ErrorMessage>{postError}</ErrorMessage>}
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" {...register("title")} />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="body">Message:</label>
          <textarea id="body" {...register("body")} rows={6}></textarea>
          {errors.boddy && <ErrorMessage>{errors.body.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="media">Image Url:</label>
          <input id="media" {...register("image")} />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </div>
        <button className="cta">Post</button>
        {isSubmitSuccessful && <span className="success">{message}</span>}
      </form>
    </>
  );
}