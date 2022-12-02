import useAxios from "./useAxios";
import { useState, useEffect } from "react";

const useAxiosFetch = ({ url, method }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const http = useAxios();

  const fetchData = async () => {
    try {
      const response = await http[method](url);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [method, url]);

  return { loading, data, setData, error };
};

export default useAxiosFetch;
