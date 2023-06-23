import { useContext } from "react";
import { Context } from "../context/BlogContext";

const useBlogContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw Error("There is no passing any value in Context Provider!");
  }
  return context;
};

export default useBlogContext;
