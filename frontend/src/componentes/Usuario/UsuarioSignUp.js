import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UsuarioServer from "./UsuarioServer";
import Cookies from "universal-cookie";
import styles from "./Sign.module.css";

const UsuarioSignUp = () => {
    const history = useNavigate();

    const [usuario, setUsuario] = useState({id: 0, nombre: "", correo: "", contrasenia: "", domicilio: ""});

    const handleInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            let ban = false;
            const usuarios = await (await UsuarioServer.getAllUsuarios()).json();
            usuarios.Usuarios.forEach(u => {
                if(u.correo === usuario.correo) ban = true;
            });

            if(!ban){
                const data = await (await UsuarioServer.addUsuario(usuario)).json();

                if(data.message === "Exitoso"){
                    const cookies = new Cookies();
                    cookies.set("id", `${data.Usuarios[0].id}`, {path: "/"});
                    cookies.set("nombre", data.Usuarios[0].nombre, {path: "/"});
                    cookies.set("correo", usuario.correo, {path: "/"});
                    cookies.set("contrasenia", usuario.contrasenia, {path: "/"});
                    cookies.set("domicilio", data.Usuarios[0].domicilio, {path: "/"});

                    history("/home");
                }
            }else console.log("Correo ya en uso");
        }catch(error){
            console.log(error);
        }
    };

    return(
        // <html>
        //     <div className={styles.loginbox}>
        //     <h2>Registro</h2>
        //     <form onSubmit={handleSubmit}>
            
        //         <div className={styles.userBox}>
        //             <label >Nombre</label>
        //             <input type="text" name="nombre" placeholder="username" onChange={handleInputChange}  minLength="5" maxLength="20" autoFocus required />
        //         </div>

        //         <div className={styles.userBox}>
        //             <label >Correo Electrónico</label>
        //             <input type="email" name="correo" placeholder="youremail@company.ltd" onChange={handleInputChange}  minLength="5" maxLength="70" autoFocus required />
        //         </div>

        //         <div className={styles.userBox}>
        //             <label >Contraseña</label>
        //             <input type="password" name="contrasenia" placeholder="*****" onChange={handleInputChange}  minLength="6" maxLength="20" autoFocus required />
        //         </div>

        //         <div className={styles.userBox}>
        //             <label >Domicilio</label>
        //             <input type="text" name="domicilio" placeholder="address" onChange={handleInputChange}  minLength="5" maxLength="150" autoFocus required />
        //         </div>

        //         <button type="submit" className="btn btn-primary">Iniciar Sesión</button> 
        //     </form>
        // </div>
        // </html>
        <div className={styles.html2}>
        <div className={styles.loginBox}>
            <h2>Registro</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.userBox}>
                    <label>Nombre</label>
                    <input type="text"  name="nombre"  onChange={handleInputChange}  minLength="5" maxLength="20" autoFocus required />
                </div>

                <div className={styles.userBox}>
                    <label>Correo</label>
                    <input type="email" name="correo" onChange={handleInputChange}  minLength="5" maxLength="70" autoFocus required />
                </div>
                <div className={styles.userBox}>
                    <label>Contraseña</label>
                    <input type="password" name="contrasenia"  onChange={handleInputChange}  minLength="6" maxLength="20" autoFocus required />
                </div>
                <div className={styles.userBox}>
                    <label>Domicilio</label>
                    <input type="text" name="domicilio"  onChange={handleInputChange}  minLength="5" maxLength="150" autoFocus required />
                </div>
                <button type="submit" className={styles.a}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Registarse</button> 
                </form>
            </div>
        </div>
    );
};

export default UsuarioSignUp;