import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { UpdateContext } from "../../../context/UpdateContext";

const schema = yup.object().shape({
  message: yup.string().required("Please enter your message"),
});

export default function CommentOnPost() {
  const [, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const { state, addComment } = useContext(UpdateContext);
  let { id } = useParams();

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

    const message = data.message;

    const formData = {
      body: message,
    };

    try {
      const response = await http.post(`posts/${id}/comment`, JSON.stringify(formData));
      console.log(response.data);
      addComment(response.data);
      console.log(state);
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(postComment)} className="comment-form">
      {postError && <ErrorMessage>{postError}</ErrorMessage>}
      <div>
        <textarea id="message" {...register("message")} className="comment-textarea w-100" rows={6}></textarea>
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </div>
      <button className="cta">Send</button>
    </form>
  );
}
