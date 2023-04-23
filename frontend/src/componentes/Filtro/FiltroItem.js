import React from "react";
import style from "./Filtro.module.css";

const FiltroItem = ({ contenido }) => {
    return(
        <>{<><label id={style.radLabel}>
            <input type="radio" id={style.radInput} name="rad" value={contenido} />
            <div id={style.radDesign}></div>
            <div id={style.radText}>{contenido}</div>
        </label></>}</>
    );
};

export default FiltroItem;