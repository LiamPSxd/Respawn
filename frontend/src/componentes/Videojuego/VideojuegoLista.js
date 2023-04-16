import React, { useEffect, useState } from 'react';
import VideojuegoItem from './VideojuegoItem';
import style from "./Videojuego.module.css";
import * as VideojuegoServer from './VideojuegoServer';
import * as CatalogoVideojuegoServer from '../Catalogo/Relacion/CatalogoVideojuegoServer';
import * as OfertaVideojuegoServer from '../Ofertas/Relacion/OfertaVideojuegoServer';
import { recuperarBusqueda } from "../NavBar/NavBar";

let [videojuegos, setVideojuegos] = [];
let idCatalogo = 0;

const VideojuegoLista = ({ catalogo,idOferta }) => {
    [videojuegos, setVideojuegos] = useState([]);

    if(catalogo!= null){
        [idCatalogo] = useState(catalogo.id);
    }
    

    useEffect(() => {
        listaVideojuegos(null, idOferta);
        // eslint-disable-next-line
    }, []);

    return(
        <><div id={style.contenedorTarjetas}>
            {videojuegos.map(videojuego => (
                <VideojuegoItem key={videojuego.id} videojuego={videojuego} listaVideojuegos={listaVideojuegos} />
            ))}
        </div></>
    );
};

export default VideojuegoLista;

export const listaVideojuegos = async (busqueda,idOferta) => {
    try{

        let data = "" ; 

        switch (window.location.pathname){
            case "/catalogo":
<<<<<<< HEAD
                data = await getContenido();
               break;
            case "/xbox":
                data = await getContenido();
               break;
            case "/playstation":
                data = await getContenido();
               break;
            case "/nintendo":
                data = await getContenido();
               break;
=======
            case "/xbox":     
            case "/playstation":
            case "/nintendo":
>>>>>>> 65b33631235d7588de430f10bcf5f767fb45b7f1
            case "/pc":
               data = await getContenido();
               break;
            case "/ofertas":
                data =  await getOferta(idOferta);
                break;
                default: ;
        }
        
        
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

const getOferta = async (idOferta) => {
    const dataOfertaVideojuego = await (await OfertaVideojuegoServer.getOfertaVideojuegosByIdOferta(idOferta)).json();
    let idVideojuegos = "";

    if(dataOfertaVideojuego != null)
        await dataOfertaVideojuego.VideojuegoOfertas.forEach(cv => {
            idVideojuegos += cv.idVideojuego + ",";
        });

    return await (await VideojuegoServer.getVideojuegosByIdVideojuegos(idVideojuegos)).json();
};

