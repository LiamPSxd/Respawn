import React, { useEffect, useState } from "react";
import CatalogoItem from "./CatalogoItem";
import CatalogoBanner from "./CatalogoBanner";
import * as CatalogoServer from "./CatalogoServer";
import style from "./Catalogo.module.css";
import { MDBCarousel } from "mdb-react-ui-kit";
import FiltroLista from "../Filtro/FiltroLista";

const CatalogoLista = ({ idCatalogo }) => {
    const [catalogos, setCatalogos] = useState([]);

    const listaCatalogos = async () => {
        try{
            const data = await (await CatalogoServer.getCatalogo(idCatalogo)).json();
            setCatalogos(data.Catalogos);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listaCatalogos();
        // eslint-disable-next-line
    }, []);

    return(
        <><div id={style.banner}>
            {catalogos.map(catalogo => (
                <MDBCarousel key={catalogo.id} showControls showIndicators fade>
                    {catalogo.banner.map((b, id) => (
                        <CatalogoBanner key={id+1} id={id+1} banner={b} />
                    ))}
                </MDBCarousel>
            ))}
        </div>

        <div>
            <FiltroLista />

            <div className="row">
                {catalogos.map(catalogo => (
                    <CatalogoItem key={catalogo.id} catalogo={catalogo} />
                ))}
            </div>
        </div></>
    );
};

export default CatalogoLista;