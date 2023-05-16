import React, { useState, useEffect } from "react";
import OfertaTimer from "./OfertaTimer";
import OfertaItem from "./OfertaItem";
import * as OfertaServer from "./OfertaServer";
import style from "./Oferta.module.css";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";

let [ofertas, setOfertas] = [];

const OfertaLista = () => {
    [ofertas, setOfertas] = useState([]);

    useEffect(() => {
        listaOfertas(null);
        // eslint-disable-next-line
    }, []);

    return(
        <><div id={style.divP}>
            <h1 id={style.h1}>Tiempo restante:</h1>

            <OfertaTimer countdownTimestampMs={1704067200000} />
        </div>
        
        <div id={style.contenedorTarjetas}>
            {ofertas.map(oferta => (
                <OfertaItem key={oferta.id} oferta={oferta} />
            ))}
        </div></>
    );
};

export default OfertaLista;

export const listaOfertas = async (busqueda) => {
    try{
        const data = await (await OfertaServer.getAllOfertas()).json();

        if(busqueda == null) setOfertas(data.Ofertas);
        else setOfertas(recuperarBusqueda(busqueda, data.Ofertas));
    }catch(error){
        console.log(error);
    }
};