import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const schema = yup.object().shape({
  symbol: yup.string().required("Please select a symbol"),
});

export default function ReactPost() {
  let { id } = useParams();
  const [emoji, setEmoji] = useState();

  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const http = useAxios();

  let symbol = emoji;

  async function submitReaction() {
    try {
      const response = await http.put(`posts/${id}/react/${symbol}`);
      console.log(response);
      setEmoji(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitReaction)}>
      <select value={emoji} {...register("symbol")} onChange={(e) => setEmoji(e.target.value)}>
        <option value="">Select an emoji</option>
        <option>😍</option>
        <option>😱</option>
        <option>👌</option>
        <option>👋</option>
        <option>🙏</option>
      </select>
      <button>React</button>
    </form>
  );
}

/*  return (
    <form onSubmit={handleSubmit(submitReaction)}>
      <input {...register("test")} />
      <button>React</button>
    </form>
  );*/
