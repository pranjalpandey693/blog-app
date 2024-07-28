import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigete = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", {
        username,
        password,
      });
      login(res.data.token);
      navigete("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
