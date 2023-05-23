import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UsuarioServer from "./UsuarioServer";
import * as WishListServer from "../WishList/WishListServer";
import * as UsuarioWishListServer from "./Relacion/UsuarioWishListServer";
import * as UsuarioCuponServer from "./Relacion/UsuarioCuponServer";
import Cookies from "universal-cookie";
import styles from "./Sign.module.css";

const UsuarioSignUp = () => {
    const history = useNavigate();

    const [usuario, setUsuario] = useState({ id: 0, nombre: "", correo: "", contrasenia: "", domicilio: "", carrito: [] });

    const handleInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let ban = false;

            const usuarios = await (await UsuarioServer.getAllUsuarios()).json();
            usuarios.Usuarios.forEach(u => {
                if (u.correo === usuario.correo) ban = true;
            });

            if (!ban) {
                const data = await (await UsuarioServer.addUsuario(usuario)).json();

                if (data.message === "Exitoso") {
                    let dataUsuario = null;
                    const cookies = new Cookies();

                    await (await UsuarioServer.getAllUsuarios()).json().then(u => {
                        u.Usuarios.map( us =>
                            dataUsuario = us
                        );
                    });

                    await addWishList(dataUsuario.id);
                    await addCupon(dataUsuario.id);

                    cookies.remove("id");
                    cookies.remove("nombre");
                    cookies.remove("correo");
                    cookies.remove("contrasenia");
                    cookies.remove("domicilio");
                    
                    cookies.set("id", `${dataUsuario.id}`, { path: "/" });
                    cookies.set("nombre", dataUsuario.nombre, { path: "/" });
                    cookies.set("correo", usuario.correo, { path: "/" });
                    cookies.set("contrasenia", usuario.contrasenia, { path: "/" });
                    cookies.set("domicilio", dataUsuario.domicilio, { path: "/" });

                    history("/home");
                } else console.log("Problema al crear la cuenta");
            } else console.log("Correo ya en uso");
        } catch (error) {
            console.log(error);
        }
    };

    const addWishList = async (idUsuario) => {
        const data = await (await WishListServer.addWishList("0")).json();

        if (data.message === "Exitoso") {
            const dataWishLists = await (await WishListServer.getAllWishLists()).json();

            await dataWishLists.WishLists.forEach(async wishList => {
                const uw = await (await UsuarioWishListServer.getUsuarioWishListByIdWishList(wishList.id)).json();

                if(uw.message !== "Exitoso"){
                    await UsuarioWishListServer.addUsuarioWishList(idUsuario, wishList.id);
                }
            });
        }
    };

    const addCupon = async (idUsuario) => {
        for (let i = 0; i < 4; i++) {
            switch(i){
                case 0:
                    await (await UsuarioCuponServer.addUsuarioCupon(idUsuario, i, 1)).json();
                    break;
                case 1:
                    await (await UsuarioCuponServer.addUsuarioCupon(idUsuario, i, 0)).json();
                    break;
                case 2:
                    await (await UsuarioCuponServer.addUsuarioCupon(idUsuario, i, 3)).json();
                    break;
                case 3:
                    await (await UsuarioCuponServer.addUsuarioCupon(idUsuario, i, 5)).json();
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <><div className={styles.html2}>
            <div className={styles.loginBox}>
                <h2>Registro</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.userBox}>
                        <label className={styles.label}>Nombre</label>
                        <input type="text" name="nombre" onChange={handleInputChange} minLength="5" maxLength="20" autoFocus required className={styles.input} />
                    </div>

                    <div className={styles.userBox}>
                        <label className={styles.label}>Correo</label>
                        <input type="email" name="correo" onChange={handleInputChange} minLength="5" maxLength="70" autoFocus required className={styles.input} />
                    </div>

                    <div className={styles.userBox}>
                        <label className={styles.label}>Contraseña</label>
                        <input type="password" name="contrasenia" onChange={handleInputChange} minLength="6" maxLength="20" autoFocus required className={styles.input} />
                    </div>

                    <div className={styles.userBox}>
                        <label className={styles.label}>Domicilio</label>
                        <input type="text" name="domicilio" onChange={handleInputChange} minLength="5" maxLength="150" autoFocus required className={styles.input} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button type="submit" id={styles.a} className="btn">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div></>
    );
};

export default UsuarioSignUp;