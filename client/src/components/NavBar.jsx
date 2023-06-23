import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

const NavBar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const logoutHandler = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Blog's Res</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="singup">Sing Up</Link>
              <Link to="login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
