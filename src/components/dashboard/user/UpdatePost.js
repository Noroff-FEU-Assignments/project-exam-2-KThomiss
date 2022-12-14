import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../common/ErrorMessage";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});

export default function UpdateForm({ id, title, body }) {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  async function updateYourPost(data) {
    try {
      const response = await http.put(`posts/${id}`, data);
      if (response.status === 200) {
        setMessage("Post updated.");
      }
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }
  }

  return (
    <form onSubmit={handleSubmit(updateYourPost)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" {...register("title")} defaultValue={title} />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" {...register("body")} rows={6} defaultValue={body}></textarea>
        {errors.body && <ErrorMessage>{errors.body.message}</ErrorMessage>}
      </div>
      <button className="cta">Update</button>
      {isSubmitSuccessful && <span className="success">{message}</span>}
    </form>
  );
}

UpdateForm.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
};
