import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object().shape({
  avatar: yup.string().required(),
});

export default function UpdateBanner({ name, avatar }) {
  const [message, setMessage] = useState();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  async function updateAvatar(data) {
    try {
      const response = await http.put(`profiles/${name}/media`, data);
      if (response.status === 200) {
        avatar(response.data);
        setMessage("Avatar is updated");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(updateAvatar)}>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input {...register("avatar")} id="avatar" />
      </div>
      <button className="cta">Update</button>
      {isSubmitSuccessful && <span className="success">{message}</span>}
    </form>
  );
}
