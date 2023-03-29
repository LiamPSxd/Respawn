import React, { useEffect, useState } from "react";
import style from "./Cupon.module.css"
import * as CuponServer from './CuponServer';

const Cupon=()=>{
    const [cupones, setCupones] = useState([]);
    const listaCupones = async() =>{
        try {
            const response = await CuponServer.getCupones();
            const data = await response.json();
            setCupones(data.Cupones); 
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        listaCupones();
    },[]);

    return(
        <>
        <div id={style.cabecera}>
            <h1>Cupones disponibles</h1>
        </div>
        <div id={style.contenedorTarjetas}>
            {cupones.map((cupon)=>(
                <div id={style.tarjeta} className="card" key={cupon.id}>
                    <img id={style.imgCard} src={cupon.imagen} className="card-image-top" alt=""/>
                    <div className="card-body" id={style.cuerpoTarjeta}>
                        <h5>{cupon.nombre}</h5>
                        <p>{cupon.descripcion}</p>
                    </div>
                </div>
            ))}
        </div>  
        </>
    );
};
export default Cupon;