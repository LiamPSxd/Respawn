import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UsuarioServer from "./UsuarioServer";
import Cookies from "universal-cookie";
import styles from "./Usuario.module.css";

const UsuarioLogIn = () => {
    const history = useNavigate();

    const [usuario, setUsuario] = useState({ correo: "", contrasenia: "" });

    const handleInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (usuario.correo != null) {
                const data = await (await UsuarioServer.getUsuarioByCorreo(usuario.correo)).json();
                if (data.message === "Exitoso") {
                    if (data.Usuarios[0].contrasenia === usuario.contrasenia) {
                        const cookies = new Cookies();
                        cookies.set("id", `${data.Usuarios[0].id}`, { path: "/" });
                        cookies.set("nombre", data.Usuarios[0].nombre, { path: "/" });
                        cookies.set("correo", usuario.correo, { path: "/" });
                        cookies.set("contrasenia", usuario.contrasenia, { path: "/" });
                        cookies.set("domicilio", data.Usuarios[0].domicilio, { path: "/" });

                        history("/home");
                        window.location.reload();
                    } else {
                        alert("Contraseña incorrecta");
                    }
                }else{
                    alert("Correo no registrado");
                }

            }
        } catch (error) {
            alert("No es posible iniciar sesión ahora, intente más tarde");
        }
    };

    return (
        <><div className={styles.html2}>
            <div className={styles.loginBox}>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.userBox}>
                        <label className={styles.label}>Correo</label>
                        <input type="email" name="correo" required onChange={handleInputChange} className={styles.input} />
                    </div>

                    <div className={styles.userBox}>
                        <label className={styles.label}>Contraseña</label>
                        <input type="password" name="contrasenia" id="password" required onChange={handleInputChange} className={styles.input} />
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <button type="submit" id={styles.a} className="btn">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div></>
    );
};

export default UsuarioLogIn;