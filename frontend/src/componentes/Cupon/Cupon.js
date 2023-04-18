import React, { useEffect, useState } from "react";
import style from "./Cupon.module.css"
import * as CuponServer from './CuponServer';
import { recuperarBusqueda } from "../NavBar/NavBar";
import ModalCupon from "./ModalCupon";


let [cupones, setCupones] = [];
var conexionBD = false;
const Cupon = () => {
    [cupones, setCupones] = useState([]);

    useEffect(() => {
        listaCupones(null);
    },[]);

    function comprobacion(conexionBD){
        if(conexionBD === false){
            return <ModalCupon/>
        }else{
            return (<><div id={style.cabecera}>
                
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
            </div></>)
        }
    }
    return(
        comprobacion(conexionBD)
    );
};

export default Cupon;

export const listaCupones = async (busqueda) => {
    try{
        const data = await (await CuponServer.getCupones()).json();
        if(busqueda == null) setCupones(data.Cupones);
        else setCupones(recuperarBusqueda(busqueda, data.Cupones));
        conexionBD = true;
    }catch(error){
        console.log(conexionBD);
        console.log(error);
    }
};