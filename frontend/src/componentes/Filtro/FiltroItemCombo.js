import React from "react";

const FiltroItemCombo = ({ filtro }) => {
    return(
        <>{String(filtro.id) !== "0" &&
            <option>{filtro.nombre}</option>
        }</>
    );
};

export default FiltroItemCombo;