import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { async } from "@firebase/util";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [error,setError]= useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (error) {
      setError(error.message)
    }
  };
  return (
    <html className="my">
     <body className="body">
    <div class="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input type="email" name="email" required="" onChange={handleChange}/>
          <label>Nombre de usuario</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" id="password" required="" onChange={handleChange}/>
          <label>Contraseña</label>
        </div>
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Iniciar
        </a>
      </form>
    </div>
    </body>
    </html>
  );
};

export default Login;
