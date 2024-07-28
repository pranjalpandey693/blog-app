import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
