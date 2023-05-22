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
    const [usuarioWishList, setUsuarioWishList] = useState({ idUsuario: 0, idWishList: 0 });
    const [usuarioCupon, setUsuarioCupon] = useState({ idUsuario: 0, idCupon: 0, cantidad: 0 });

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
                        dataUsuario = u;
                    });
                    await addWishList();
                    await addCupon();

                    cookies.remove("id");
                    cookies.remove("nombre");
                    cookies.remove("correo");
                    cookies.remove("contrasenia");
                    cookies.remove("domicilio");
                    
                    cookies.set("id", `${dataUsuario.Usuarios[0].id}`, { path: "/" });
                    cookies.set("nombre", dataUsuario.Usuarios[0].nombre, { path: "/" });
                    cookies.set("correo", usuario.correo, { path: "/" });
                    cookies.set("contrasenia", usuario.contrasenia, { path: "/" });
                    cookies.set("domicilio", dataUsuario.Usuarios[0].domicilio, { path: "/" });

                    history("/home");
                } else console.log("Problema al crear la cuenta");
            } else console.log("Correo ya en uso");
        } catch (error) {
            console.log(error);
        }
    };

    const addWishList = async () => {
        const data = await (await WishListServer.addWishList("0")).json();

        if (data.message === "Exitoso") {
            const dataWishLists = await (await WishListServer.getAllWishLists()).json();
            let idWishList = "";

            dataWishLists.WishLists.forEach(async wishList => {
                const uw = await (await UsuarioWishListServer.getUsuarioWishListByIdWishList(wishList.id)).json();

                if (uw.message !== "Exitoso") idWishList = wishList.id
            })

            setUsuarioWishList(usuario.id, idWishList);
            await UsuarioWishListServer.addUsuarioWishList(usuarioWishList);
        }
    };

    const addCupon = async () => {
        for (let i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    setUsuarioCupon(usuario.id, i, 1);
                    break;
                case 1:
                    setUsuarioCupon(usuario.id, i, 0);
                    break;
                case 2:
                    setUsuarioCupon(usuario.id, i, 3);
                    break;
                case 3:
                    setUsuarioCupon(usuario.id, i, 5);
                    break;
                default:
                    break;
            }

            await (await UsuarioCuponServer.addUsuarioCupon(usuarioCupon)).json();
        }
    };

    return (
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