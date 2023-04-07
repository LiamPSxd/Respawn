import React, { useEffect, useState } from "react";
import style from "./Cupon.module.css"
import * as CuponServer from './CuponServer';
import { recuperarBusqueda } from "../NavBar/NavBar";

let [cupones, setCupones] = [];

const Cupon = () => {
    [cupones, setCupones] = useState([]);

    useEffect(() => {
        listaCupones(null);
    },[]);

    return(
        <><div id={style.cabecera}>
            <h1>Cupones disponibles</h1>
        </div>

        <div id={style.contenedorTarjetas}>
            {cupones.map(cupon => (
                <div id={style.tarjeta} className="card" key={cupon.id}>
                    <img id={style.imgCard} src={cupon.imagen} className="card-image-top" alt=""/>
                    <div className="card-body" id={style.cuerpoTarjeta}>
                        <h5>{cupon.nombre}</h5>
                        <p>{cupon.descripcion}</p>
                    </div>
                </div>
            ))}
        </div></>
    );
};

export default Cupon;

export const listaCupones = async (busqueda) => {
    try{
        const data = await (await CuponServer.getCupones()).json();

        if(busqueda == null) setCupones(data.Cupones);
        else setCupones(recuperarBusqueda(busqueda, data.Cupones));
    }catch(error){
        console.log(error);
    }
};