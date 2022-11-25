import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  banner: yup.string().required(),
});

export default function UpdateBanner({ name, banner }) {
  const [message, setMessage] = useState();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  async function updateBanner(data) {
    try {
      const response = await http.put(`profiles/${name}/media`, data);
      if (response.status === 200) {
        banner(response.data);
        setMessage("Banner is updated");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(updateBanner)}>
      <div>
        <label htmlFor="banner">Banner:</label>
        <input {...register("banner")} id="banner" />
      </div>
      <button className="cta">Update</button>
      {isSubmitSuccessful && <span className="success">{message}</span>}
    </form>
  );
}

UpdateBanner.propTypes = {
  name: PropTypes.string.isRequired,
  banner: PropTypes.func.isRequired,
};
