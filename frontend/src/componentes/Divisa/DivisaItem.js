import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as DivisaServer from "./DivisaServer";

const DivisaItem = ({divisa, divisas}) => {
    const history = useNavigate();

    const handleCambioDivisa = async (div) => {
        await divisas.forEach(d => {
            if(d.seleccionado){
                d.seleccionado = false;
                div.seleccionado = true

                DivisaServer.updateDivisa(d);
                DivisaServer.updateDivisa(div);
            }
        });

        history('/monedaPeso');
    };

    return(
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h1 className="card-title"><strong>{divisa.nombre}</strong></h1>
                <h4 className="card-text">{divisa.pais}</h4>
                <h4 className="card-text">{divisa.valor} {divisa.simbolo}</h4>

                {divisa.seleccionado === true ? (
                    <button className="btn btn-success my-2" disabled>Seleccionado</button>
                ) : (
                    <button onClick={() => handleCambioDivisa(divisa)} className="btn btn-primary my-2">Seleccionar</button>
                )}
            </div>
        </div>
    );
};

export default DivisaItem;