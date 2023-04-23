import React from "react";
import { MDBCarouselItem } from "mdb-react-ui-kit";

const CatalogoBanner = ({ id, banner }) => {
    return(
        <><MDBCarouselItem
            className="w-100 d-block"
            itemId={id}
            src={banner}
            height="300vh"
        /></>
    );
};

export default CatalogoBanner;