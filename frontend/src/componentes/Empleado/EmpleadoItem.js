import React from 'react';
import * as EmpleadoServer from './EmpleadoServer';
import * as EmpleadoLista from './EmpleadoLista';
import { useNavigate } from 'react-router-dom';

const EmpleadoItem = ({empleado, listaEmpleados}) => {
    const history = useNavigate();
    const handleDelete = async (empleadoId) => {
        await EmpleadoServer.deleteEmpleado(empleadoId);
        listaEmpleados();
    };

    return(
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h2 className="card-title"><strong>{empleado.nombre}</strong></h2>
                <h5 className="card-text"><strong>Dirección: </strong> {empleado.direccion}</h5>
                <h5 className="card-text"><strong>Salario: $</strong> {empleado.salario}</h5>
                <button onClick={() => history(`/updateEmpleado/${empleado.id}`)} className="btn btn-info my-2">Actualizar</button>
                <button onClick={() => empleado.id && handleDelete(empleado.id)} className="btn btn-danger">Eliminar</button>
            </div>
        </div>
    );
};

export default EmpleadoItem;