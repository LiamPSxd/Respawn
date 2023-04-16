import React, { useEffect, useState } from "react";
import * as FiltroVServer from './FiltroVServer'
import './FiltroV.css';
const FiltroV = ({ idFiltroV }) => {
    const [filtros, setFiltros] = useState([]);
    const listaFiltros = async () => {
        try {
            const data = await (await FiltroVServer.getAllFiltros()).json();
            setFiltros(data.Filtros); console.log(data); console.log(filtros);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
      listaFiltros();
      // eslint-disable-next-line
  }, []);
    return (
    <div id="filtro">
        <form id="fitro">
            <select defaultValue={'Default'}>
                <option value={"Default"} disabled>Selecciona un filtro:</option>
                <option >Videojuegos ordenados alfabeticamente Ascendente(A-Z)</option>
                <option>Videojuegos ordenados alfabeticamente Descente(Z-A)</option>
                <option>Precio:Mayor a Menor</option>
                <option>Precio:Menor a Mayor</option>
                <option>Calificacion</option>
            </select>
            <button type="submit" className="mx-2 btn btn-block btn-primary" id="aplicarf">
                Aplicar Filtro
            </button>
        </form>
    </div>

    );

};


export default FiltroV;