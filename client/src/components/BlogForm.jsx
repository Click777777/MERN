import axios from "axios";
import React, { useState } from "react";
import useBlogContext from "../hooks/useBlogContext";
import useAuthContext from "../hooks/useAuthContext";

const BlogForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useBlogContext();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState(null);
  const [storedPostData, setStoredPostData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("First you need to login");
      return;
    }
    const datas = { title, subTitle, about };

    try {
      const res = await axios.post("/api/blogs", JSON.stringify(datas), {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      if (res) {
        setStoredPostData([]);
        setError(null);
        setTitle("");
        setSubTitle("");
        setAbout("");
        dispatch({ type: "createBlog", payload: res.data });
      }
    } catch (error) {
      setStoredPostData(error.response.data.storedPostData);
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New App</h3>

      <label htmlFor="title">Type:</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={storedPostData.includes("title") ? "error" : ""}
      />

      <label htmlFor="subTitle">App:</label>
      <input
        type="text"
        name="subTitle"
        id="subTitle"
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        className={storedPostData.includes("subTitle") ? "error" : ""}
      />

      <label htmlFor="about">Features:</label>
      <input
        type="text"
        name="about"
        id="about"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        className={storedPostData.includes("about") ? "error" : ""}
      />

      <button>Add App</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BlogForm;
