import React from "react";
import VideojuegoLista from "../Videojuego/VideojuegoLista";

const CatalogoItem = () => {
    return(
        <div className="col-lg-8 row-md-4">
            <VideojuegoLista />
        </div>
    );
};

export default CatalogoItem;