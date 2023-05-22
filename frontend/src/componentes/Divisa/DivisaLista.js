import React, { useEffect, useState } from "react";
import DivisaItem from "./DivisaItem";
import * as DivisaServer from "./DivisaServer";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";
import Mensaje from "../Mensaje/Mensaje";
import style from "./Divisa.module.css";

let [divisas, setDivisas] = [];

const DivisaLista = () => {
    [divisas, setDivisas] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [showMensaje, setShowMensaje] = useState(false);

    const mostrarMensaje = (title, content) => {
        setTitulo(title);
        setContenido(content);
        setShowMensaje(!showMensaje);
    };

    useEffect(() => {
        if(!listaDivisas(null)) mostrarMensaje("Error", "Se perdió la conexión con la Base de Datos. Por favor, intente más tarde");
        // eslint-disable-next-line
    }, []);

    return(
        <><div id={style.contenedorTarjetas}>
            {divisas.map(divisa => (
                <DivisaItem key={divisa.id} divisa={divisa} listaDivisas={listaDivisas} divisas={divisas} updateCurrencies={updateCurrencies} />
            ))}
        </div>

        <Mensaje show={showMensaje} close={mostrarMensaje} title={titulo} status={false}>{contenido}</Mensaje></>
    );
};

export default DivisaLista;

export const listaDivisas = async (busqueda) => {
    try{
        const data = await (await DivisaServer.getAllDivisas()).json();
        await data.Divisas.forEach(divisa => {
            if(String(divisa.seleccionado) === "True")
                if(String(divisa.hora) !== String(new Date().getDate())) updateCurrencies(data.Divisas, divisa.simbolo);
        });

        if(busqueda == null) setDivisas(sortArray(data.Divisas));
        else setDivisas(recuperarBusqueda(busqueda, sortArray(data.Divisas)));

        sortArray(data.Divisas);

        if(data.message === "Exitoso") return true;
        else return false;
    }catch(error){
        console.log(error);
    }
};

const updateCurrencies = async (divisas, simbolo) => {
    if(String(simbolo) !== "ADA" && String(simbolo) !== "BTC"){
        const dataCurrencies = await (await DivisaServer.getAllCurrencies(simbolo)).json();

        Object.keys(dataCurrencies.conversion_rates).map(async key => {
            await divisas.forEach(async divisa => {
                if(divisa.simbolo === key){
                    divisa.hora = new Date().getDate();
                    divisa.valor = dataCurrencies.conversion_rates[key];

                    await DivisaServer.updateDivisa(divisa);
                }
            });
        });
    }
};

const sortArray = (divisas) => {
    const nombres = [];
    const divisasSort = [];

    divisas.forEach(divisa => {
        nombres.push(divisa.nombre);
    });

    nombres.sort()
    .forEach(nombre => {
        divisas.forEach(divisa => {
            if(nombre === divisa.nombre){
                divisasSort.push(divisa);
                divisas = divisas.filter(d => d.nombre !== nombre);
            }
        });
    });

    return divisasSort;
}