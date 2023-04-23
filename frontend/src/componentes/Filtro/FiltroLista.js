import React, { useEffect, useState } from "react";
import FiltroItem from "./FiltroItem";
import FiltroItemCombo from "./FiltroItemCombo";
import * as FiltroServer from "./FiltroServer";
import style from "./Filtro.module.css";

const FiltroLista = () => {
    const [filtros, setFiltros] = useState([]);

    const listaFiltros = async () => {
        try{
            const data = await (await FiltroServer.getAllFiltros()).json();
            setFiltros(data.Filtros);
        }catch(error){
            console.log(error);
        }
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

                    <form>
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
                <select defaultValue="Default">
                    <option value="Default" disabled>Seleccione un filtro</option>

                    {filtros.map(filtro => (
                        <FiltroItemCombo key={filtro.id} filtro={filtro} />
                    ))}
                </select>
            </form>
        </div></>
    );
};

export default FiltroLista;