import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {signup} = useAuth()

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]:value})
  };
  //-----------------------//
  const handleSubmit = e =>{
    e.preventDefault()
    signup(user.email,user.password)
  }
  return (
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
  );
};

export default Register;
