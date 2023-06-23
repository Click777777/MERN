import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("There is no passing any value in Context Provider!");
  }
  return context;
};

export default useAuthContext;
