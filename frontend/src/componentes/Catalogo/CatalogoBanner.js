import React, { memo } from "react";
import { MDBCarouselItem } from "mdb-react-ui-kit";
import style from "./Catalogo.module.css";

const CatalogoBanner = ({ identificador, banner }) => {
    return(
        <><MDBCarouselItem
            id={style.item}
            className="w-100 d-block"
            itemId={identificador}
            src={banner}
        /></>
    );
};

export default memo(CatalogoBanner);