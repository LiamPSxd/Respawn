import React from "react";
import VideojuegoLista from "../Videojuego/VideojuegoLista";

const FiltroItem = ({filtro}) => {
    return(
        <div className="col-lg-8 row-md-4">
            <VideojuegoLista filtro={filtro} />
        </div>
    );
};

export default FiltroItem;