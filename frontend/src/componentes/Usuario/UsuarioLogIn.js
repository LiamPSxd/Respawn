import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UsuarioServer from "./UsuarioServer";
import Cookies from "universal-cookie";
import "./UsuarioLogIn.module.css";

const UsuarioLogIn = () => {
    const history = useNavigate();

    const [usuario, setUsuario] = useState({correo: "", contrasenia: ""});

    const handleInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            if(usuario.correo != null){
                const data = await (await UsuarioServer.getUsuarioByCorreo(usuario.correo)).json();

                if(data.Usuarios[0].contrasenia === usuario.contrasenia){
                    const cookies = new Cookies();
                    cookies.set("id", `${data.Usuarios[0].id}`, {path: "/"});
                    cookies.set("nombre", data.Usuarios[0].nombre, {path: "/"});
                    cookies.set("correo", usuario.correo, {path: "/"});
                    cookies.set("contrasenia", usuario.contrasenia, {path: "/"});
                    cookies.set("domicilio", data.Usuarios[0].domicilio, {path: "/"});

                    history("/catalogo");
                }
            }
        }catch(error){
            console.log(error);
        }
    };

    return(
        <><div className="body">
            <div className="login-box">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <label>Correo</label>
                        <input type="email" name="correo" required onChange={handleInputChange} />
                    </div>

                    <div className="user-box">
                        <label>Contraseña</label>
                        <input type="password" name="contrasenia" id="password" required onChange={handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </form>
            </div>
        </div></>
    );
};

export default UsuarioLogIn;