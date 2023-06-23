import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BlogContext from "./context/BlogContext";
import AuthContext from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContext>
      <BlogContext>
        <App />
      </BlogContext>
    </AuthContext>
  </React.StrictMode>
);
