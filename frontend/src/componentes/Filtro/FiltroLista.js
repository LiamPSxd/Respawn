import React, { useEffect, useState } from "react";
import FiltroItem from "./FiltroItem";
import FiltroItemCombo from "./FiltroItemCombo";
import * as FiltroServer from "./FiltroServer";
import * as CatalogoFiltroServer from "../Catalogo/Relacion/CatalogoFiltroServer";
import style from "./Filtro.module.css";
import VideojuegoLista from "../Videojuego/VideojuegoLista";

const FiltroLista = ({ catalogo }) => {
    const [filtros, setFiltros] = useState([]);
    const [filtro, setFiltro] = useState(-1);

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

    const handleInputChange = async (e) => {
        // filtros.map(async filtro => {
        //     if(String(filtro.id) === "0"){
        //         filtro.contenido.map(async c => {
        //             if(e.target.value === c) await setFiltro(e.target.value + filtro.id);
        //         })
        //     }else if(filtro.nombre === e.target.value) await setFiltro(e.target.value + filtro.id);
        // });

        setFiltro(e.target.value);
    }

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
        
        <div className="card-group">
            <VideojuegoLista catalogo={catalogo} idFiltro={filtro.id} />
        </div></>
    );
};

export default FiltroLista;