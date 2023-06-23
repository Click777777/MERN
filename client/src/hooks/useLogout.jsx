import useAuthContext from "./useAuthContext";
import useBlogContext from "./useBlogContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: BlogContextDispatch } = useBlogContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LogOut", payload: null });
    BlogContextDispatch({ type: "blogs", payload: null });
  };
  return { logout };
};

export default useLogout;
