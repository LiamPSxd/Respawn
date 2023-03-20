import React, { useEffect, useState } from 'react';
import EmpleadoItem from './EmpleadoItem';
import * as EmpleadoServer from './EmpleadoServer';

const EmpleadoLista = () => {
    const [empleados, setEmpleados] = useState([]);

    const listaEmpleados = async () =>{
        try{
            const res = await EmpleadoServer.listaEmpleados();
            const data = await res.json();
            setEmpleados(data.Empleados);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listaEmpleados();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="row">
            {empleados.map((empleado) => (
                <EmpleadoItem key={empleado.id} empleado={empleado} listaEmpleados={listaEmpleados} />
            ))}
        </div>
    );
};

export default EmpleadoLista;