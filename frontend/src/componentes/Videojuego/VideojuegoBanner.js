import React from "react";
import { MDBCarouselItem } from "mdb-react-ui-kit";

const VideojuegoBanner = ({ id, caratula, captura }) => {
    return(
        <>{String(id) === "0" ? (
            <MDBCarouselItem
                className="w-100 d-block"
                itemId={id+1}
                src={caratula}
                alt="Carátula"
                height="300vh"
            />
        ) : (
            <MDBCarouselItem
                className="w-100 d-block"
                itemId={id+1}
                src={captura}
                alt="Captura"
                height="300vh"
            />
        )}</>
    );
};

export default VideojuegoBanner;