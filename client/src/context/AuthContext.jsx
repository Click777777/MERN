import React, { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();
const AuthContext = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "Login":
        return {
          user: action.payload,
        };

      case "LogOut":
        return { user: null };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "Login", payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;
