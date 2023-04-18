import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const UsuarioHome = () => {
    const history = useNavigate();
    const cookies = new Cookies();

    const [usuario] = useState({id: cookies.get("id"), nombre: cookies.get("nombre"), correo: cookies.get("correo"), contrasenia: cookies.get("contrasenia"), domicilio: cookies.get("domicilio")});

    const handleLogOut = async () => {
        cookies.remove("id");
        cookies.remove("nombre");
        cookies.remove("correo");
        cookies.remove("contrasenia");
        cookies.remove("domicilio");

        history("/logIn");
    };

    return(
        <><div>
            <h1>¡Bienvenido {usuario.nombre}!</h1>
            <h3>Correo: {usuario.correo}</h3>
            <h3>Domicilio: {usuario.domicilio}</h3>
            <button onClick={handleLogOut}>Cerrar Sesión</button>
        </div></>
    );
};

export default UsuarioHome;