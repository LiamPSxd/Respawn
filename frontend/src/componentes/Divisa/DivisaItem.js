import React from "react";
import * as DivisaServer from "./DivisaServer";
import { useNavigate } from "react-router-dom";

const DivisaItem = ({divisa, getAllDivisas}) => {
    const history = useNavigate();

    const handleDelete = async (idDivisa) => {
        await DivisaServer.deleteDivisa(idDivisa);
        getAllDivisas();
    };

    return(
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h2 className="card-title"><strong>{divisa.nombre}</strong></h2>
                <h5 className="card-text">{divisa.simbolo}{divisa.valor}</h5>
                <h5 className="card-text">{divisa.pais}</h5>
                <button onClick={() => history(`/monedaPeso/divisa`)} className="btn btn-primary my-2">Añadir</button>
                <button onClick={() => history(`/monedaPeso/divisa/${divisa.id}`)} className="btn btn-success my-2">Actualizar</button>
                <button onClick={() => handleDelete(divisa.id)} className="btn btn-danger">Eliminar</button>
            </div>
        </div>
    );
};

export default DivisaItem;