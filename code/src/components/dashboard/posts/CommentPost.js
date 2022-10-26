import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  message: yup.string().required("Please enter your message"),
});

export default function CommentOnPost() {
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
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
        <label htmlFor="message">Your Message:</label>
        <textarea id="message" {...register("message")}></textarea>
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </div>
      <button>Send</button>
    </form>
  );
}
