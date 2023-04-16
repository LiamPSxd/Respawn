import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Videojuego.module.css";

const VideojuegoItem = ({videojuego}) => {
    const history = useNavigate();

    // const handleTitulo = () => {
    //     const doc = document.getElementById("Videojuego_titulo__3_iLC");
    //     const t = doc.innerHTML.length;

    //     switch(t){
    //         case t < 12:
    //             doc.style.setProperty("font-size", "37.624");
    //             break;
    //         case t >= 12 && t < 24:
    //             doc.style.setProperty("font-size", "33.624");
    //             break;
    //         case t >= 24 && t < 36:
    //             doc.style.setProperty("font-size", "30.624");
    //             break;
    //         default:
    //             doc.style.setProperty("font-size", "45.624");
    //     }
    // };

    return(
        <><div id={style.tarjeta} className="card">
            <img id={style.imgCard} className="card-img-top" src={videojuego.caratula} alt="caratula" />

            <div className="card-body">    
                <h1 id={style.titulo} className="card-title">{videojuego.nombre}</h1>

                <div id={style.contenidoTarjeta}>
                    <h4 className="card-text" ><strong>Genero </strong>{videojuego.genero}</h4>
                    <h4 className="card-text"><strong>Precio </strong>{videojuego.precio}</h4>
                </div>

                <button className="btn btn-success my-2" onClick={() => history(`/videojuego/${videojuego.id}`)}><strong>Más Detalles</strong></button>
            </div>
        </div></>
    );
};

export default VideojuegoItem;