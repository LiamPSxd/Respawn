import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import './Videojuego.module.css';
import * as UsuarioServer from '../Usuario/UsuarioServer';


const CarritoBtn = ({ videojuego }) => {
    const cookies = new Cookies();
    const [correoB] = useState({ correo: cookies.get("correo") });
    const [usuario, setUsuario] = useState({ id: 0, nombre: "", correo: "", contrasenia: "", domicilio: "", carrito: {} });


    const getUsuario = async () => {
        try {
            const data = await (await UsuarioServer.getUsuarioByCorreo(correoB.correo)).json();
            const { id, nombre, correo, contrasenia, domicilio, carrito } = data.Usuarios[0];
            setUsuario({ id, nombre, correo, contrasenia, domicilio, carrito });
        } catch (error) {
            console.log(error);
        }
    }

    const updateCarrito = async (usuario) => {
        try {
          await (await UsuarioServer.updateUsuario(usuario)).json();
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getUsuario();
    }, []);

    const boton = () => {
        var str = JSON.stringify(usuario.carrito).substring(0, JSON.stringify(usuario.carrito).length - 1);
        str+=',"'+videojuego.id+'":'+videojuego.id+'}'
        usuario.carrito=JSON.parse(str)
        //updateCarrito(usuario);
        console.log(usuario.nombre);
        console.log(usuario.contrasenia);
        console.log(usuario.correo);
        console.log(usuario.domicilio);
        console.log(usuario.id);
        console.log(usuario.carrito);
    }

    return (
        <>
            <button className="btn btn-success btn-lg" onClick={boton}>Agregar a carrito (${videojuego.precio.valor})</button>
            <label id="qwerty">qaaaaa</label>
        </>
    );


};

export default CarritoBtn;




