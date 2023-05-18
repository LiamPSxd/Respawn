import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import * as CompraServer from "./CompraServer";
import moment from "moment";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import { CompareTwoTone } from "@mui/icons-material";


const CompraItem = () => {
    const cookies = new Cookies();
    var idTarjeta = cookies.get("idTarjeta");
    var idVideojuego = cookies.get("videojuegoId");
    const [compra, setCompra] = useState({id: 2, fecha: "a", hora: "a", iva: .16, descuento: 0, monto: "a", metodo: "a", descripcion:"a"});
    const initialState = { id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] };
    const [videojuego, setVideojuego] = useState(initialState);

    const getVideojuego = async (idVideojuego) => {
        try {
            const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
            const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas } = data.Videojuegos[0];
            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas });
        } catch (error) {
            console.log(error);
        }
    };

    const addCompra = async () => {
        try{
            compra.fecha=moment().format('L');
            compra.hora=moment().format('LT'); 
            compra.metodo= cookies.get("metodo")
            compra.monto=videojuego.precio.valor + videojuego.precio.simbolo;
            compra.descripcion=videojuego.nombre;
            const data = await (await CompraServer.addCompra(compra)).json();
            
            console.log(data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getVideojuego(idVideojuego);
        console.log("ñam")
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <label id="pruebaV">Para comprar el videojuego {idVideojuego}</label>
            <label id="pruebaT">Estás usando la tarjeta {idTarjeta}</label>

            <button onClick={addCompra}>Crear compra</button>
        </>
    );

}
export default CompraItem