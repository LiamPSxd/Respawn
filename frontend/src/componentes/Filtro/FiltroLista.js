import React, { useEffect, useState } from "react";
import FiltroItem from "./FiltroItem";
import FiltroItemCombo from "./FiltroItemCombo";
import * as FiltroServer from "./FiltroServer";
import * as CatalogoFiltroServer from "../Catalogo/Relacion/CatalogoFiltroServer";
import style from "./Filtro.module.css";
import VideojuegoLista, { listaVideojuegos } from "../Videojuego/VideojuegoLista";

import Mensaje from "../Mensaje/Mensaje";

const FiltroLista = ({ catalogo }) => {
    const [filtros, setFiltros] = useState([]);
    const [showMensaje, setShowMensaje] = useState(false);

    const listaFiltros = async () => {
        try{
            const data = await getContenido();
            setFiltros(data.Filtros);
        }catch(error){
            console.log(error);
        }
    };

    const getContenido = async () => {
        const dataCatalogoFiltro = await (await CatalogoFiltroServer.getCatalogoFiltrosByIdCatalogo(catalogo.id)).json();
        let idFiltros = "";
    
        if(dataCatalogoFiltro != null)
            await dataCatalogoFiltro.CatalogoFiltros.forEach(cf => {
                idFiltros += cf.idFiltro + ",";
            });
    
        return await (await FiltroServer.getFiltrosByIdFiltros(idFiltros)).json();
    };

    const handleInputChange = (e) => {
        filtros.map(async filtro => {
            if(String(filtro.id) === "0"){
                filtro.contenido.map(async c => {
                    if(e.target.value === c) idFiltro = `${filtro.id},${c}`;
                })
            }else if(filtro.nombre === e.target.value) idFiltro = `${filtro.id},null`;
        });

        listaVideojuegos(null, idFiltro);
        setShowMensaje(true);
    };

    useEffect(() => {
        listaFiltros();
        // eslint-disable-next-line
    }, []);

    return(
        <>{filtros.filter(filtro => String(filtro.id) === "0")
        .map(filtro => (
            <aside key={filtro.id} id={style.categoria}>
                <div>
                    <h4 id={style.text}><u>{filtro.nombre}</u></h4>

                    <form onChange={handleInputChange}>
                        <div>
                            {filtro.contenido.map((c, id) => (
                                <FiltroItem key={id} contenido={c} />
                            ))}
                        </div>
                    </form>
                </div>
            </aside>
        ))}
        
        <div className="card-group">
            <div id={style.select}>
                <form>
                    <select defaultValue="Default" onChange={handleInputChange}>
                        <option value="Default" disabled>Seleccione un filtro</option>

                        {filtros.map(filtro => (
                            <FiltroItemCombo key={filtro.id} filtro={filtro} />
                        ))}
                    </select>
                </form>
            </div>

            <VideojuegoLista catalogo={catalogo} />
        </div>
        
        {showMensaje && <Mensaje titulo={"Prueba"} contenido={"Hola"} />}</>
    );
};

export default FiltroLista;

export var idFiltro = "-1";