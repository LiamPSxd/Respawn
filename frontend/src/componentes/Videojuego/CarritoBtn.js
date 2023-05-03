import React, { useState } from "react";
import Cookies from "universal-cookie";
import './Videojuego.module.css';
import * as UsuarioServer from '../Usuario/UsuarioServer';


const CarritoBtn = ({ videojuego }) => {
    const cookies = new Cookies();
    const [correoB] = useState({ correo: cookies.get("correo") });
    const [usuario, setUsuario] = useState({ id: 0, nombre: "", correo: "", contrasenia: "", domicilio: "", carrito: [] });
    const [aux, setAux]= useState({})
     

    const getUsuario = async () => {
        try {
            const data = await (await UsuarioServer.getUsuarioByCorreo(correoB.correo)).json();
            const { id, nombre, correo, contrasenia, domicilio, carrito } = data.Usuarios[0];
            setUsuario({ id, nombre, correo, contrasenia, domicilio, carrito });
            
        } catch (error) {
            console.log(error);
        }
    }

    const addCarrito=async()=>{
        try {
            
        } catch (error) {
            
        }
    }

    const boton = () => {
        getUsuario();
        setAux(usuario.carrito.)
        document.getElementById("qwerty").innerHTML=aux +"k"
        
    }

    return (
        <>
            <button className="btn btn-success btn-lg" onClick={boton}>Agregar a carrito (${videojuego.precio.valor})</button>
            <label id= "qwerty">qaaaaa</label>
        </>
    );


};

export default CarritoBtn;




