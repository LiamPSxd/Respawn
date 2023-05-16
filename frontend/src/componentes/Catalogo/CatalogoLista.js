import React, { useEffect, useState } from "react";
import CatalogoItem from "./CatalogoItem";
import * as CatalogoServer from "./CatalogoServer";
import ModalVideojuego from "../Videojuego/ModalVideojuego";

const CatalogoLista = ({ idCatalogo }) => {
    const [catalogos, setCatalogos] = useState([]);

    const [showVideojuego, setShowVideojuego] = useState(true);

    const listaCatalogos = async () => {
        try{
            const data = await (await CatalogoServer.getCatalogo(idCatalogo)).json();
            setCatalogos(data.Catalogos);
        }catch(error){
            console.log(error);
        }
    };

    const mostrarVideojuegoAleatorio = () => setShowVideojuego(!showVideojuego);

    useEffect(() => {
        listaCatalogos();
        // eslint-disable-next-line
    }, []);

    return(
        <><div className="row">
            {catalogos.map(catalogo => (
                <CatalogoItem key={catalogo.id} catalogo={catalogo} />
            ))}
        </div>

        {parseInt(idCatalogo) === 0 ? (
            <ModalVideojuego show={showVideojuego} close={mostrarVideojuegoAleatorio} />
        ) : null}</>
    );
};

export default CatalogoLista;