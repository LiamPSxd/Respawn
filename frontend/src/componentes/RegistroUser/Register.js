import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error,setError]= useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(user.email, user.password);
      navigate("/catalogo");
    } catch (error) {
      setError(error.message)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">Correo Electrónico </label>
      <input
        type="email"
        name="email"
        placeholder="youremail@company.ltd"
        onChange={handleChange}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleChange}
      />

      <button>Crear cuenta</button>
    </form>
    </div>
  );
};

export default Register;
