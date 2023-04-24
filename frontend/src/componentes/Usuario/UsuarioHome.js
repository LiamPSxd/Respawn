import React, { useState } from "react";

import Cookies from "universal-cookie";

const UsuarioHome = () => {
    
    const cookies = new Cookies();

    const [usuario] = useState({id: cookies.get("id"), nombre: cookies.get("nombre"), correo: cookies.get("correo"), contrasenia: cookies.get("contrasenia"), domicilio: cookies.get("domicilio")});

    

    return(
        <><div>
            <h1>¡Bienvenido {usuario.nombre}!</h1>
            <h3>Correo: {usuario.correo}</h3>
            <h3>Domicilio: {usuario.domicilio}</h3>
        </div></>
    );
};

export default UsuarioHome;