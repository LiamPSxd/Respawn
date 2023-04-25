import React, { useState } from "react";
import styles from "./Home.module.css";
import Cookies from "universal-cookie";

const UsuarioHome = () => {
    
    const cookies = new Cookies();

    const [usuario] = useState({id: cookies.get("id"), nombre: cookies.get("nombre"), correo: cookies.get("correo"), contrasenia: cookies.get("contrasenia"), domicilio: cookies.get("domicilio")});


    return(
        <html className={styles.html}>
        <>

            <div className={styles.contenedor}>
                <h1 className={styles.welcome}>¡Bienvenid@ a Respawn!</h1>
                <h3 className={styles.user}><b>{usuario.nombre}</b></h3>
                <h4 className={styles.registro}>Si aun no te registras</h4>
                <a href="/signUp" className={styles.link}>
                    <span></span>
                    <span></span> 
                    <span></span> 
                    <span></span>  
                    click aquí</a>
            </div>
            <audio>
                <source src="../audio.mp3" type="audio/mpeg"/>
            </audio>
        </>
        </html>
        
    );
};

export default UsuarioHome;