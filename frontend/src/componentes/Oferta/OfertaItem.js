import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OfertaTimer from "./OfertaTimer";
import * as VideojuegoOfertaServer from "../Videojuego/Relacion/VideojuegoOfertaServer";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import style from "./Oferta.module.css";

const OfertaItem = ({ oferta }) => {
    const history = useNavigate();
    const [videojuegos, setVideojuegos] = useState([]);

    const listaItems = async () => {
        try{
            const data = await getContenido();
            setVideojuegos(data.Videojuegos);
        }catch(error){
            console.log(error);
        }
    };

    const getContenido = async () => {
        const dataVideojuegoOferta = await (await VideojuegoOfertaServer.getVideojuegoOfertaByIdOferta(oferta.id)).json();
        let idVideojuegos = "";

        if(dataVideojuegoOferta.message === "Exitoso")
            await dataVideojuegoOferta.VideojuegoOfertas.forEach(vo => {
                idVideojuegos += `${vo.idVideojuego},`;
            });

        return await (await VideojuegoServer.getVideojuegosByIdVideojuegos(idVideojuegos)).json();
    };

    useEffect(() => {
        listaItems();
        // eslint-disable-next-line
    }, []);

    return(
        <>{videojuegos.map(videojuego => (
            <div key={videojuego.id} id={style.tarjeta} className="card">
                <img id={style.imgCard} className="card-img-top" src={videojuego.caratula} alt="caratula" />

                <div id={style.cardBody} className="card-body">    
                    <h1 id={style.titulo} className="card-title">{videojuego.nombre}</h1>

                    <div id={style.contenidoTarjeta}>
                        <h5 className="card-text" ><strong>Antes: </strong><strike>{videojuego.precio.valor} {videojuego.precio.simbolo}</strike></h5>
                        <h4 className="card-text" ><strong>Descuento: </strong>{oferta.descuento * 100}%</h4>
                        <h4 className="card-text" ><strong>Ahora: </strong>{videojuego.precio.valor - (videojuego.precio.valor * oferta.descuento)} {videojuego.precio.simbolo}</h4>
                        <h4 className="card-text"><strong>Tiempo restante: </strong></h4><OfertaTimer countdownTimestampMs={oferta.tiempo}/>
                    </div>
                    <button id={style.botonDetalles} className="btn btn-success my-2" onClick={() => history(`/videojuego/${videojuego.id}`)}><strong>Más Detalles</strong></button>
                </div>
            </div>
        ))}</>
    );
};

export default OfertaItem;