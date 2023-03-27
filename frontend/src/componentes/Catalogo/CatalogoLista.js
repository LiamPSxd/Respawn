import React, { useEffect, useState } from "react";
import CatalogoItem from "./CatalogoItem";
import * as CatalogoServer from "./CatalogoServer";

const DivisaLista = () => {
    const [divisas, setDivisas] = useState([]);

    const listaDivisas = async () => {
        try{
            const res = await CatalogoServer.getAllDivisas();
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
                <CatalogoItem key={divisa.id} divisa={divisa} getAllDivisas={listaDivisas} />
            ))}
        </div>
    );
};

export default DivisaLista;


