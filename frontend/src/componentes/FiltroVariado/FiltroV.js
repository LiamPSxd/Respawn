import React, { useEffect, useState } from "react";
import * as FiltroVServer from './FiltroVServer'
import './FiltroV.css';
const FiltroV = ({ idFiltroV }) => {
    function ShowSelected()
{
/* Para obtener el valor */
var cod = document.getElementById("nombre").value;
alert(cod);
console.log(cod);
 
}
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
            <select id="nombre" name="nombre" defaultValue={'Default'} onChange={ShowSelected}>
                <option value={"Default"} disabled>Selecciona un filtro:</option>
                <option >Videojuegos ordenados alfabeticamente Ascendente(A-Z)</option>
                <option>Videojuegos ordenados alfabeticamente Descente(Z-A)</option>
                <option>Precio:Mayor a Menor</option>
                <option>Precio:Menor a Mayor</option>
                <option>Calificacion</option>
                <option>Juegos Gratis</option>
            </select>
        </form>
    </div>

    );

};


export default FiltroV;