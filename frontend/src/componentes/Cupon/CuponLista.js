import React, { useEffect, useState } from "react";
import style from "./Cupon.module.css"
import * as CuponServer from "./CuponServer";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";
import CuponItem from "./CuponItem";

let [cupones, setCupones] = [];

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
    }catch(error){
        console.log(error);
    }
};