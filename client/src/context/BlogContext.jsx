import React, { createContext, useReducer } from "react";

export const Context = createContext();
const BlogContext = ({ children }) => {
  const blogReducer = (state, action) => {
    switch (action.type) {
      case "blogs":
        return { blogs: action.payload };

      case "blog":
        return { blogs: action.payload };

      case "createBlog":
        return { blogs: [action.payload, ...state.blogs] };

      case "deleteBlog":
        return {
          blogs: state.blogs.filter((doc) => doc._id !== action.payload._id),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(blogReducer, { blogs: null });

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default BlogContext;
