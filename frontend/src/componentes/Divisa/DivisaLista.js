import React, { useEffect, useState } from "react";
import DivisaItem from "./DivisaItem";
import * as DivisaServer from "./DivisaServer";

const DivisaLista = () => {
    const [divisas, setDivisas] = useState([]);

    const listaDivisas = async () => {
        try{
            const dataDivisas = await (await DivisaServer.getAllDivisas()).json();
            let data = "";

            await dataDivisas.Divisas.forEach(divisa => {
                if(divisa.seleccionado) data = divisa
            });

            // if(data.hora != new Date().getHours()) updateCurrencies(dataDivisas.Divisas, data.simbolo);

            setDivisas(dataDivisas.Divisas);
        }catch(error){
            console.log(error);
        }
    };

    const updateCurrencies = async (divisas, simbolo) => {
        const dataCurrencies = await (await DivisaServer.getAllCurrencies(simbolo)).json();

        await divisas.forEach(divisa => {
            if(divisa.simbolo == dataCurrencies.data[`${divisa.simbolo}`].code){
                divisa.hora = new Date().getHours();
                divisa.valor = dataCurrencies.data[`${divisa.simbolo}`].value;

                DivisaServer.updateDivisa(divisa);
            }
        });
    }

    useEffect(() => {
        listaDivisas();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            {divisas.map(divisa => (
                <DivisaItem key={divisa.id} divisa={divisa} divisas={divisas} />
            ))}
        </div>
    );
};

export default DivisaLista;