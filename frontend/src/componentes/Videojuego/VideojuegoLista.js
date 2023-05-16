import React, { useEffect, useState } from "react";
import VideojuegoItem from "./VideojuegoItem";
import * as VideojuegoServer from './VideojuegoServer';
import * as CatalogoVideojuegoServer from '../Catalogo/Relacion/CatalogoVideojuegoServer';
import style from "./Videojuego.module.css";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";

let [videojuegos, setVideojuegos] = [];
let idCatalogo = 0;

const VideojuegoLista = ({ catalogo }) => {
    [videojuegos, setVideojuegos] = useState([]);
    [idCatalogo] = useState(catalogo.id);

    useEffect(() => {
        listaVideojuegos(null, "-1");
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

export const listaVideojuegos = async (busqueda, idFiltro) => {
    try{
        const data = await getContenido(idFiltro);

        if(busqueda == null) setVideojuegos(data.Videojuegos);
        else setVideojuegos(recuperarBusqueda(busqueda, data.Videojuegos));
    }catch(error){
        window.alert("Error al realizar la búsqueda, por favor inténtalo más tarde")
    }
};

const getContenido = async (idFiltro) => {
    const dataCatalogoVideojuego = await (await CatalogoVideojuegoServer.getCatalogoVideojuegosByIdCatalogo(idCatalogo)).json();
    let idVideojuegos = "";

    if(dataCatalogoVideojuego != null)
        await dataCatalogoVideojuego.CatalogoVideojuegos.forEach(cv => {
            idVideojuegos += cv.idVideojuego + ",";
        });

    var dataVideojuegos = await (await VideojuegoServer.getVideojuegosByIdVideojuegos(idVideojuegos)).json();

    if(idFiltro === "-1") return dataVideojuegos;
    else{
        const filtro = await (await VideojuegoServer.getVideojuegosByIdFiltro(idFiltro)).json();

        if(filtro.message === "Exitoso"){
            const data = {"Videojuegos": []};

            filtro.Videojuegos.forEach(videojuego => {
                dataVideojuegos.Videojuegos.forEach(v => {
                    if(v.id === videojuego.id) data.Videojuegos.push(v);
                })
            })

            return data;
        }else{
            window.alert("No hay resultados para este filtro");
            return dataVideojuegos;
        }
    }
};