import React from "react";

const FiltroItem = ({ filtro }) => {
    return(
        <><div className="col-lg-8 row-md-4">
            <VideojuegoLista filtro={filtro} />
        </div></>
    );
};

export default FiltroItem;