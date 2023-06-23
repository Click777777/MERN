import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Singup from "./pages/Singup";
import Login from "./pages/Login";
import useAuthContext from "./hooks/useAuthContext";
import Detail from "./pages/Detail";

const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/singup" element={!user ? <Singup /> : <Home />} />
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/blog/:id" element={user ? <Detail /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
