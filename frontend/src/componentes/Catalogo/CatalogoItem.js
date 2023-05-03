import React from "react";
import style from "./Catalogo.module.css";
import CatalogoBanner from "./CatalogoBanner";
import { MDBCarousel } from "mdb-react-ui-kit";
import FiltroLista from "../Filtro/FiltroLista";

const CatalogoItem = ({ catalogo }) => {
    return(
        <><div id={style.banner}>
            <MDBCarousel key={catalogo.id} showControls showIndicators fade>
                {catalogo.banner.map((b, id) => (
                    <CatalogoBanner key={id+1} id={id+1} banner={b} />
                ))}
            </MDBCarousel>
        </div>

        <div>
            <FiltroLista catalogo={catalogo} />
        </div></>
    );
};

export default CatalogoItem;