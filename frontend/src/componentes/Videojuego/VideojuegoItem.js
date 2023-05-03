import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Videojuego.module.css";

const VideojuegoItem = ({ videojuego }) => {
    const history = useNavigate();

    const [fontSize, setFontSize] = useState(0);

    const handleTitulo = () => {
        const titulo = videojuego.nombre.length;

        switch(titulo !== null){
            case titulo <= 8:
                setFontSize(2.75);
                break;
            case titulo > 8 && titulo <= 16:
                setFontSize(2.4);
                break;
            case titulo > 16 && titulo < 24:
                setFontSize(2.05);
                break;
            default:
                setFontSize(1.7);
        }
    };

    useEffect(() => {
        handleTitulo();
        // eslint-disable-next-line
    }, []);

    return(
        <><div id={style.tarjeta} className="card">
            <img id={style.imgCard} className="card-img-top" src={videojuego.caratula} alt="caratula" />

            <div id={style.cardBody} className="card-body">
                <h1 id={style.titulo} className="card-title" style={{fontSize: fontSize + "em"}}>{videojuego.nombre}</h1>

                <div id={style.contenidoTarjeta}>
                    <h4 className="card-text"><strong>Genero </strong>{videojuego.genero}</h4>
                </div>

                <button className="btn btn-success my-2" onClick={() => history(`/videojuego/${videojuego.id}`)}><strong>Más Detalles</strong></button>
            </div>
        </div></>
    );
};

export default VideojuegoItem;