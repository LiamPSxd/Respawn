import React from "react";
import VideojuegoLista from "../Videojuego/VideojuegoLista";

const CatalogoItem = ({ catalogo }) => {
    return(
        <><div className="card-group">
            <VideojuegoLista catalogo={catalogo} />
        </div></>
    );
};

export default CatalogoItem;