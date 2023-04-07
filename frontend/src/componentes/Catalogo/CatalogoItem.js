import React from "react";
import VideojuegoLista from "../Videojuego/VideojuegoLista";

const CatalogoItem = ({catalogo}) => {
    return(
        <div className="col-lg-8 row-md-4">
            <VideojuegoLista catalogo={catalogo} />
        </div>
    );
};

export default CatalogoItem;