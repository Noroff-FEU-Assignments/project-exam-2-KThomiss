import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";

const schema = yup.object().shape({
  title: yup.string().required(),
  message: yup.string().required(),
});

function UpdateForm({ id, title, body }) {
  const [, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function updateYourPost(data) {
    setSubmitting(true);
    setRegisterError(null);
    try {
      const response = await http.put(`posts/${id}`, data);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(updateYourPost)}>
      {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" {...register("title")} defaultValue={title} />
        {errors.message && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" {...register("message")} defaultValue={body}></textarea>
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </div>
      <button>Update</button>
    </form>
  );
}

export default UpdateForm;
