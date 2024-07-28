import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import AuthProvider from "./context/AuthProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const ProtectedRoute = ({children}:{children:React.ReactNode})=>{
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />
}

const App: React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard"
           element= {
            <ProtectedRoute>
<Dashboard />
            </ProtectedRoute>
           }
         />
          <Route path="/" element={<Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
