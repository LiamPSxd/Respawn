import React from "react";
import VideojuegoLista from "../Videojuego/VideojuegoLista";

const OfertaItem = ({idOferta}) => {
    return(
        <div className="col-lg-8 row-md-4">
            <VideojuegoLista idOferta={idOferta} />
        </div>
    );
};

export default OfertaItem;