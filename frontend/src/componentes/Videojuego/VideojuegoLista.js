import React, { useEffect, useState } from 'react';
import VideojuegoItem from './VideojuegoItem';
import * as VideojuegoServer from './VideojuegoServer';
import * as CatalogoVideojuegoServer from '../Catalogo/Relacion/CatalogoVideojuegoServer';
import { recuperarBusqueda } from "../NavBar/NavBar";

let [videojuegos, setVideojuegos] = [];
let idCatalogo = 0;

const VideojuegoLista = ({ catalogo }) => {
    [videojuegos, setVideojuegos] = useState([]);
    [idCatalogo] = useState(catalogo.id);

    useEffect(() => {
        listaVideojuegos(null);
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
        const data = await getContenido();

        if(busqueda == null) setVideojuegos(data.Videojuegos);
        else setVideojuegos(recuperarBusqueda(busqueda, data.Videojuegos));
    }catch(error){
        console.log(error);
    }
};

const getContenido = async () => {
    const dataCatalogoVideojuego = await (await CatalogoVideojuegoServer.getCatalogoVideojuegosByIdCatalogo(idCatalogo)).json();
    let idVideojuegos = "";

    if(dataCatalogoVideojuego != null)
        await dataCatalogoVideojuego.CatalogoVideojuegos.forEach(cv => {
            idVideojuegos += cv.idVideojuego + ",";
        });

    return await (await VideojuegoServer.getVideojuegosByIdVideojuegos(idVideojuegos)).json();
};