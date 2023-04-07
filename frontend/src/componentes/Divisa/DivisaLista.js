import React, { useEffect, useState } from "react";
import DivisaItem from "./DivisaItem";
import * as DivisaServer from "./DivisaServer";
import { recuperarBusqueda } from "../NavBar/NavBar";

let [divisas, setDivisas] = [];

const DivisaLista = () => {
    [divisas, setDivisas] = useState([]);

    useEffect(() => {
        listaDivisas(null);
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            {divisas.map(divisa => (
                <DivisaItem key={divisa.id} divisa={divisa} listaDivisas={listaDivisas} divisas={divisas} updateCurrencies={updateCurrencies} />
            ))}
        </div>
    );
};

export default DivisaLista;

export const listaDivisas = async (busqueda) => {
    try{
        const data = await (await DivisaServer.getAllDivisas()).json();
        await data.Divisas.forEach(divisa => {
            if(divisa.seleccionado === "True")
                if(String(divisa.hora) !== String(new Date().getDate())) updateCurrencies(data.Divisas, divisa.simbolo);
        })

        if(busqueda == null) setDivisas(data.Divisas);
        else setDivisas(recuperarBusqueda(busqueda, data.Divisas));
    }catch(error){
        console.log(error);
    }
};

const updateCurrencies = async (divisas, simbolo) => {
    if(simbolo !== "ADA"){
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