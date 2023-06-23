import React, { useEffect } from "react";
import BlogForm from "../components/BlogForm";
import BlogDetail from "../components/BlogDetail";
import axios from "axios";
import useBlogContext from "../hooks/useBlogContext";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();

  const { blogs, dispatch } = useBlogContext();

  useEffect(() => {
    const blogs = async () => {
      const fetchBlogs = await axios.get("/api/blogs", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const arrCollection = fetchBlogs.data;
      if (fetchBlogs.status === 200) {
        dispatch({ type: "blogs", payload: arrCollection });
      }
    };
    user && blogs();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {blogs && blogs.length > 0 ? (
          blogs.map((doucment) => (
            <BlogDetail key={doucment._id} document={doucment} />
          ))
        ) : (
          <div>There is no nothing to display !</div>
        )}
      </div>
      <BlogForm />
    </div>
  );
};

export default Home;
