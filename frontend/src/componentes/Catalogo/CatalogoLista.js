import React, { useEffect, useState } from "react";
import CatalogoItem from "./CatalogoItem";
import * as CatalogoServer from "./CatalogoServer";

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
        <><div>
            {catalogos.map(catalogo => (
                <CatalogoItem key={catalogo.id} catalogo={catalogo} />
            ))}
        </div></>
    );
};

export default CatalogoLista;