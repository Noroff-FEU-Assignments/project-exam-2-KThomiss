import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import ErrorMessage from "../common/ErrorMessage";
import PropTypes from "prop-types";

const nameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").matches(nameRegex, "No punctuation symbols except underscore (_)"),
  email: yup.string().required("Please enter your email.").email().matches(emailRegex, "must be a stud.noroff.no or noroff.no email address."),
  password: yup.string().required("Please enter your password").min(8, "Password must be atleast 8 characters."),
  avatar: yup.string(),
  banner: yup.string(),
});

export default function RegisterForm({ setLogShow, setRegShow }) {
  const [, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const url = BASE_URL + "auth/register";

  async function registerSubmit(data) {
    setSubmitting(true);
    setRegisterError(null);
    const formData = JSON.stringify(data);

    const options = {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setMessage("Account created");
      } else {
        setRegisterError("Account already exists");
      }
    } catch (error) {
      setRegisterError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(registerSubmit)}>
        {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
        <div>
          <label htmlFor="name">
            Name:<span className="required">*</span>
          </label>
          <input id="name" {...register("name")} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="email">
            Email:<span className="required">*</span>
          </label>
          <input id="email" {...register("email")} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="password">
            Password:<span className="required">*</span>
          </label>
          <input id="password" {...register("password")} type="password" />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="avatar">
            Avatar:<span className="optional"> (optional)</span>
          </label>
          <input id="avatar" {...register("avatar")} />
          {errors.avatar && <ErrorMessage>{errors.avatar.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="banner">
            Banner:<span className="optional"> (optional)</span>
          </label>
          <input id="banner" {...register("banner")} />
          {errors.banner && <ErrorMessage>{errors.banner.message}</ErrorMessage>}
        </div>
        <button className="cta">Register</button>
        {isSubmitSuccessful && <span className="success">{message}</span>}
        {isSubmitSuccessful && (
          <button
            type="button"
            className="cta-secondary"
            onClick={() => {
              setLogShow(true);
              setRegShow(false);
            }}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  setLogShow: PropTypes.func.isRequired,
  setRegShow: PropTypes.func.isRequired,
};
