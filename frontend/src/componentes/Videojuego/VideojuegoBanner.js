import React from "react";
import { MDBCarouselItem } from "mdb-react-ui-kit";
import style from "./Videojuego.module.css";

const VideojuegoBanner = ({ identificador, caratula, captura }) => {
    return(
        <>{String(identificador) === "0" ? (
            <MDBCarouselItem
                id={style.item}
                className="w-100 d-block"
                itemId={identificador+1}
                src={caratula}
                alt="Carátula"
                height="300vh"
            />
        ) : (
            <MDBCarouselItem
                id={style.item}
                className="w-100 d-block"
                itemId={identificador+1}
                src={captura}
                alt="Captura"
                height="300vh"
            />
        )}</>
    );
};

export default VideojuegoBanner;