import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";
/* import { useParams } from "react-router-dom"; */
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter your message"),
  image: yup.string().required("Please an image url"),
});

export default function CreatePost() {
  const [, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);

  /* let { id } = useParams(); */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  async function postComment(data) {
    setSubmitting(true);
    setPostError(null);
    console.log(data);

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
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(postComment)}>
      {postError && <ErrorMessage>{postError}</ErrorMessage>}
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" {...register("title")} />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>
      <div>
        <label htmlFor="body">Message:</label>
        <textarea id="body" {...register("body")}></textarea>
        {errors.boddy && <ErrorMessage>{errors.body.message}</ErrorMessage>}
      </div>
      <div>
        <label htmlFor="media">Image Url:</label>
        <input id="media" {...register("image")} />
        {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
      </div>
      <button className="cta">Send</button>
    </form>
  );
}
