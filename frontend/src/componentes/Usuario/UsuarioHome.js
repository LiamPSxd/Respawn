import React, { useState } from "react";
import styles from "./Home.module.css";
import Cookies from "universal-cookie";


const UsuarioHome = () => {
    const cookies = new Cookies();

    const [usuario] = useState({ id: cookies.get("id"), nombre: cookies.get("nombre"), correo: cookies.get("correo"), contrasenia: cookies.get("contrasenia"), domicilio: cookies.get("domicilio") });
    console.log(usuario.id);
    return(
        
        <><div className={styles.html}>
            <h3> <b>Aun no estas loggeado</b></h3>
            <h4>¿Quieres iniciar sesion?</h4>
            <a href="/login" className={styles.link}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        click aquí</a>
            </div>

             <><div className={styles.html}>
            <h3>Nombre de usuario: <b>{usuario.nombre}</b></h3>
            <h3>Correo utilizado: <b>{usuario.correo}</b></h3>
            <h3>Domicilio: <b>{usuario.domicilio}</b></h3>
            </div>
        </>
        </>    
    );
};


export default UsuarioHome;