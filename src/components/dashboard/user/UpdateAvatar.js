import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import useStore from "../../../context/PostContext";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  avatar: yup.string().required(),
});

export default function UpdateAvatar({ name, avatar }) {
  const [message, setMessage] = useState();
  const { setUserAvatar } = useStore();
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
        setUserAvatar(response.data.avatar);
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

UpdateAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.func.isRequired,
};
