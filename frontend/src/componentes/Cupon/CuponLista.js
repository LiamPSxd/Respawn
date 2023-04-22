import React, { useEffect, useState } from "react";
import style from "./Cupon.module.css"
import * as CuponServer from './CuponServer';
import { recuperarBusqueda } from "../NavBar/MDBNavBar";
import CuponItem from "./CuponItem";
<<<<<<< HEAD
=======

>>>>>>> 39fbf82f9aa16302a66c44ee306531a7ee6b378c

let [cupones, setCupones] = [];
var conexionBD = false;

const CuponLista = () => {
    [cupones, setCupones] = useState([]);

    useEffect(() => {
        listaCupones(null);
        // eslint-disable-next-line
    },[]);

    return(
        <><div id={style.cabecera}>
            <h1>Cupones disponibles</h1>
        </div>

        <div id={style.contenedorTarjetas}>
            {cupones.map(cupon => (
                <CuponItem  key={cupon.id} cupon={cupon} />
            ))}
        </div></>
    );
};

export default CuponLista;

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