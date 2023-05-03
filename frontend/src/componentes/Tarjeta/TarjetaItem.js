import React from "react";
import Style from "./Tarjeta.module.css"
import tarjetaImg from "./resource/Tarjeta.png"
const TarjetaItem = ({tarjeta}) =>{
    return(
        <>
        <li className="list-group-item d-flex justify-content-between list-group-item-action">
            <div className="ms-0 me-auto">
                <div className="fw-bold">Tarjeta de {tarjeta.tipo}</div>
                <p>Fecha de caducidad: {tarjeta.fechaCaducidad}</p>
            </div>
            <img src={tarjetaImg} id={Style.imagen} alt="imagen tarjeta"></img>
        </li>
        </>  
    );
}
export default TarjetaItem;