import { useState } from "react";
import axios from "axios";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const document = await axios.post(
        "/api/user/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = document.data;
      console.log("Login :", document.statusText);

      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      dispatch({ type: "Login", payload: data });
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return { error, loading, login };
};

export default useLogin;
