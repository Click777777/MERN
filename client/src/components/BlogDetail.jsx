import axios from "axios";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import useBlogContext from "../hooks/useBlogContext";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const BlogDetail = ({ document }) => {
  const { user } = useAuthContext();
  const { dispatch } = useBlogContext();

  const deleteHandler = async () => {
    if (!user) {
      return;
    }

    const uri = `/api/blogs/${document._id}`;
    const deletedDoc = await axios.delete(uri, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (deletedDoc) {
      dispatch({ type: "deleteBlog", payload: deletedDoc.data });
    }
  };

  return (
    <div className="workout-details">
      <Link to={`/blog/${document._id}`}>
        <h4>{document.title}</h4>
        <p>
          <strong>APP: </strong>
          {document.subTitle}
        </p>
        <p>
          <strong>FEATURES: </strong>
          {document.about}
        </p>
        <p>
          <strong>Relese Date: </strong>
          {formatDistanceToNow(new Date(document.createdAt), {
            addSuffix: true,
          })}
        </p>
      </Link>
      <span>
        <img
          src={process.env.PUBLIC_URL + "/trashIcon.svg"}
          alt="trashIcon"
          onClick={deleteHandler}
        />
      </span>
    </div>
  );
};

export default BlogDetail;
