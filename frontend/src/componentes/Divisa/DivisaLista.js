import React, { useEffect, useState } from "react";
import DivisaItem from "./DivisaItem";
import * as DivisaServer from "./DivisaServer";

const DivisaLista = () => {
    const [divisas, setDivisas] = useState([]);

    const listaDivisas = async () => {
        try{
            const res = await DivisaServer.getAllDivisas();
            const data = await res.json();

            setDivisas(data.Divisas);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listaDivisas();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            {divisas.map((divisa) => (
                <DivisaItem key={divisa.id} divisa={divisa} getAllDivisas={listaDivisas} />
            ))}
        </div>
    );
};

export default DivisaLista;