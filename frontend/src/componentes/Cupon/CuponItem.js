import React from "react";
import style from "./Cupon.module.css"

const CuponItem = ({ cupon }) => {
    return(
        <><div id={style.tarjeta} className="card">
            <img id={style.imgCard} src={cupon.imagen} className="card-image-top" alt="" />

            <div className="card-body">
                <h5>{cupon.nombre}</h5>
                <p>{cupon.descripcion}</p>
            </div>
        </div></>
    );
};

export default CuponItem;