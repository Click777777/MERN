import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import useBlogContext from "../hooks/useBlogContext";

const Detail = () => {
  const { user } = useAuthContext();
  const { blogs, dispatch } = useBlogContext();
  const { id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const blog = async () => {
      try {
        const url = `/api/blogs/${id}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const document = res.data;
        dispatch({ type: "blog", payload: document });
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    user && blog();
  }, [id, user, dispatch]);

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="details content">
          <h2>{blogs.subTitle}</h2>
          <div className="content">
            <p>{blogs.about}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
