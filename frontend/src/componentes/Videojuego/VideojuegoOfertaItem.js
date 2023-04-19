import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Videojuego.module.css";
import * as OfertaServer from "../Ofertas/OfertaServer"


const VideojuegoOfertaItem = ({videojuego}) => {
     
    /*llamada al oferta server*/ 
    const initialState = { id: 0, nombre: "", descuento: 0, tiempo: "" };
    const [oferta, setOfertas] = useState(initialState);

    const getOferta = async (idOferta) =>{
        try {
            const data = await (await OfertaServer.getOferta(idOferta)).json();
            const { id, nombre, descuento, tiempo } = data.Ofertas[0];
            setOfertas({ id, nombre, descuento, tiempo });

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getOferta(0);

       
         
    }, []);
    /*fin de la llamada */

    // const str = videojuego.precio.replaceAll("\D+","");
    // const ahora = parseInt (str);
    // const  preDescuento =0;
    //  ahora - (ahora*oferta.descuento);
    // if(videojuego.id == oferta.id){
    //     preDescuento = ahora - (ahora*oferta.descuento);
    //  } else{
    //      preDescuento = ahora;
    //  }
    
   
    
    /* cartas de ofertas*/
    const history = useNavigate();
    return(
        <><div id={style.tarjeta} className="card">
            <img id={style.imgCard} className="card-img-top" src={videojuego.caratula} alt="caratula" />

            <div className="card-body">    
                <h1 id={style.titulo} className="card-title">{videojuego.nombre}</h1>

                <div id={style.contenidoTarjeta}>
                    <h4 className="card-text" ><strong>Genero </strong>{videojuego.genero}</h4>
                    <h4 className="card-text"><strong>Descuento de:</strong>{oferta.descuento}0%</h4>
                </div>

                <button className="btn btn-success my-2" onClick={() => history(`/videojuego/${videojuego.id}`)}><strong>Más Detalles</strong></button>
            </div>
        </div></>
    );
};

export default VideojuegoOfertaItem;