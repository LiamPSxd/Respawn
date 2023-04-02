import React, { useEffect, useState } from "react";
import VideojuegoItem from "./VideojuegoItem";
import * as VideojuegoServer from './VideojuegoServer';
import { recuperarBusqueda } from "../NavBar/NavBar";

let [videojuegos, setVideojuegos] = [];

const VideojuegoLista = () => {
    [videojuegos, setVideojuegos] = useState([]);

    useEffect(() => {
        listaVideojuegos();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            {videojuegos.map(videojuego => (
                <VideojuegoItem key={videojuego.id} videojuego={videojuego} listaVideojuegos={listaVideojuegos} />
            ))}
        </div>
    );
};

export default VideojuegoLista;

export const listaVideojuegos = async (busqueda) => {
    try{
        const data = await (await VideojuegoServer.getAllVideojuegos()).json();

        if(busqueda == null) setVideojuegos(data.Videojuegos)
        else setVideojuegos(recuperarBusqueda(busqueda, data.Videojuegos));
    }catch(error){
        console.log(error);
    }
};