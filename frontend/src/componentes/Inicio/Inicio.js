import React, { useState } from "react";
import styles from "./Inicio.module.css";
import Cookies from "universal-cookie";

const Inicio = () => {
    const cookies = new Cookies();

    const [usuario] = useState({ id: cookies.get("id"), nombre: cookies.get("nombre"), correo: cookies.get("correo"), contrasenia: cookies.get("contrasenia"), domicilio: cookies.get("domicilio") });

    return(
        <><div className={styles.html}>
            <div className={styles.contenedor}>
                <h1 className={styles.welcome}>¡Bienvenid@ a Respawn!</h1>

                <h3 className={styles.user}><b>{usuario.nombre}</b></h3>

                <div className={styles.contenedor2}>
                    <h4 className={styles.registro}>Si aun no te registras</h4>

                    <a href="/signUp" className={styles.link}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        click aquí</a>
                </div>

                <div className={styles.contenedor3}>
                    <h4 className={styles.registro}>Si ya tienes cuenta</h4>

                    <a href="/login" className={styles.link}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        click aquí</a>
                </div>
            </div>
        </div></>
    );
};

export default Inicio;