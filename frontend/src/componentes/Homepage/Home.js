import React from "react";
import { useNavigate } from "react-router-dom";
// Codigo para la sesion ¿?
import { useAuth } from "../../context/authContext";

const Home = () => {
  // Codigo para la sesion ¿?
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() =>{
    await logout()
    navigate("/iniciodesesion")

  }

  if (loading) return <h1>Loading....</h1>

  console.log(user);
  return(
    <div>
        Bienvenido {user.email}
        <button onClick={handleLogout}>logout</button>
    </div>
    
  )
};

export default Home;
