import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        username,
        password,
      });
      login(res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterclick = () => {
    navigate("/register");
  };

  return (
    <>
    
      <h2 >Login</h2>
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
        <button type="submit">Login</button>
        <button  type="button" onClick={handleRegisterclick}>Register</button>
      </form>
    </>
  );
};

export default Login;
