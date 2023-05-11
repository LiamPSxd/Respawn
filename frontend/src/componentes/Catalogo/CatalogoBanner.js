import React, { memo } from "react";
import { MDBCarouselItem } from "mdb-react-ui-kit";
import style from "./Catalogo.module.css";

const CatalogoBanner = ({ id, banner }) => {
    return(
        <><MDBCarouselItem
            id={style.item}
            className="w-100 d-block"
            itemId={id}
            src={banner}
            height="300vh"
        /></>
    );
};

export default memo(CatalogoBanner);