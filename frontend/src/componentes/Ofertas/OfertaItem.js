import React from "react";
import VideojuegoLista from "../Videojuego/VideojuegoLista";

const OfertaItem = ({oferta}) => {
    return(
        <div className="col-lg-8 row-md-4">
            <VideojuegoLista oferta={oferta} />
        </div>
    );
};

export default OfertaItem;