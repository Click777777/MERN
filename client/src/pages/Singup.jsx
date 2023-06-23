import React, { useState } from "react";
import useSingup from "../hooks/useSingup";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, singup } = useSingup();

  const handleSubmit = (e) => {
    e.preventDefault();
    singup(email, password);
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>SingUp Now</h3>

      <label htmlFor="title">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="subTitle">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={loading}>Sing Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Singup;
