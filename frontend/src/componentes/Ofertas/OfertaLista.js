import React, { useEffect, useState } from "react";
import App from "./App";
import * as OfertaServer from "./OfertaServer";


const OfertaLista = () => {


    const [ofertas, setOfertas] = useState([]);

    const listaOfertas = async () => {
        try{
            const res = await OfertaServer.getAllOfertas();
            const data = await res.json();

            setOfertas(data.Ofertas);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        listaOfertas();
        // eslint-disable-next-line
    }, []);
    return(
        <div className="row">
            {ofertas.map((divisa) => (
                <OfertaItem key={divisa.id} divisa={divisa} getAllOfertas={listaOfertas} />
            ))}
        </div>
    );
};
export default OfertaLista;