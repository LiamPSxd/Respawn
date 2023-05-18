import React, { memo, useEffect } from "react";
import Style from "./Tarjeta.module.css"
import tarjetaImg from "./resource/Tarjeta.png"
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const TarjetaItem = ({ tarjeta }) => {
    const history = useNavigate();

    const clickTarjeta = async () => {
        console.log(tarjeta.id)
        const cookies = new Cookies();
        cookies.set("idTarjeta",tarjeta.id,{ path: "/pago/tarjeta" });
        cookies.set("metodo","1",{ path: "/pago/tarjeta" });
        history("/confirmaPago")
    }
    useEffect(() => {
        // eslint-disable-next-line
    }, []);
    return (
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