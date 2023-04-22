import React, { useEffect, useState } from "react";
import CatalogoItem from "./CatalogoItem";
import * as CatalogoServer from "./CatalogoServer";
import Filtro from "../Filtro/Filtro";
import FiltroV from "../FiltroVariado/FiltroV";

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
        <><header>
            <section id="banner">
                <img id="banner-img" src="logo2-png" alt=""></img>
            </section>

            <FiltroV />
        </header>
        
        <br></br>
        <br></br>
        
        <Filtro />
       
        <div className="row">
            {catalogos.map(catalogo => (
                <CatalogoItem key={catalogo.id} catalogo={catalogo} />
            ))}
        </div></>
    );
};

export default CatalogoLista;