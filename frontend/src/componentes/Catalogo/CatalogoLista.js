import React, { useEffect, useState } from "react";
import CatalogoItem from "./CatalogoItem";
import * as CatalogoServer from "./CatalogoServer";
import ModalVideojuego from "../Videojuego/ModalVideojuego";
import Mensaje from "../Mensaje/Mensaje";

const CatalogoLista = ({ idCatalogo }) => {
    const [catalogos, setCatalogos] = useState([]);

    const [showVideojuego, setShowVideojuego] = useState(true);

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [showMensaje, setShowMensaje] = useState(false);

    const mostrarMensaje = (title, content) => {
        setTitulo(title);
        setContenido(content);
        setShowMensaje(!showMensaje);
    };

    const listaCatalogos = async () => {
        try{
            const data = await (await CatalogoServer.getCatalogo(idCatalogo)).json();
            setCatalogos(data.Catalogos);
        }catch(error){
            mostrarMensaje("Error", "Se perdió la conexión con la Base de Datos. Por favor, intente más tarde");
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
        ) : null}
        
        <Mensaje show={showMensaje} close={mostrarMensaje} title={titulo} status={false}>{contenido}</Mensaje></>
    );
};

export default CatalogoLista;