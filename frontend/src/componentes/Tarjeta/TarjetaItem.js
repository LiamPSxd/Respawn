import React, { memo, useEffect } from "react";
import Style from "./Tarjeta.module.css"
import tarjetaImg from "./resource/Tarjeta.png"
const TarjetaItem = ({tarjeta}) =>{

    const clickTarjeta = async () =>{
        console.log(tarjeta.id)
    }
    useEffect(() => {
        // eslint-disable-next-line
    }, []);
    return(
        <>
        <li onClick={clickTarjeta} className="list-group-item d-flex justify-content-between list-group-item-action">
            <div className="ms-0 me-auto">
                <div className="fw-bold">Tarjeta de {tarjeta.tipo}</div>
                <p>Fecha de caducidad: {tarjeta.fechaCaducidad}</p>
            </div>
            <img src={tarjetaImg} id={Style.imagen} alt="imagen tarjeta"></img>
        </li>
        </>  
    );
}
export default memo(TarjetaItem);