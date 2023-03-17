import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as EmpleadoServer from "./EmpleadoServer";

const EmpleadoForm = () => {
  const history = useNavigate();
  const params = useParams();

  const initialState = {id: 0, nombre: "", direccion: "", salario: 0};
  const [empleado, setEmpleado] = useState(initialState);

  const handleInputChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!params.id) {
        res = await EmpleadoServer.registerEmpleado(empleado);
        const data = await res.json();
        if (data.message === "Exitoso") {
          setEmpleado(initialState);
        }
      } else {
        await EmpleadoServer.updateEmpleado(params.id, empleado);
      }
      history("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  const getEmpleado = async (empleadoId) => {
    try {
      const res = await EmpleadoServer.getEmpleado(empleadoId);
      const data = await res.json();
      const { nombre, direccion, salario } = data.Empleado;
      setEmpleado({ nombre, direccion, salario });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getEmpleado(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Empleado</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" name="nombre" value={empleado.nombre} onChange={handleInputChange} className="form-control" minLength="2" maxLength="100" autoFocus required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" name="direccion" value={empleado.direccion} onChange={handleInputChange} className="form-control" minLength="2" maxLength="255" autoFocus required />
        </div>
        <div className="mb-3">
          <label className="form-label">Salario</label>
          <input type="number" name="salario" value={empleado.salario} onChange={handleInputChange} className="form-control" min="1" max="9999999999" required />
        </div>
        <div className="d-grid gap-2">
          {params.id ? (
            <button type="submit" className="btn btn-block btn-primary">
              Actualizar
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              Añadir
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmpleadoForm;