import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as EmpleadoServer from "../Empleado/EmpleadoServer";
import './catalogo.css';

const Catalogo = () => {
 
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



  return (
    
    <body>
    <header>
      <section id="banner">Banner</section>
    </header>
    <br></br>
    <main>
      <aside id="categoria">
   <div id="hola">
    <h4 className="text-black text-lg">Categorias</h4>
      <input name ="video"type="radio" id="indy" value="indy"/>
      <label htmlFor="indy">Indies</label>
    <div>
      <input
      name="video"
        type="radio"
        id="Adventure"
        value="Adventure"
      />
      <label htmlFor="Adventure">Aventura</label>
    <div>
      <input name="video"type="radio" id="MMO" value="MMO"/>
      <label htmlFor="MMO">MMO</label>
    </div>
    <div>
      <input
      name="video"
        type="radio"
        id="Casual Game"
        value="Casual Game"
      />
      <label htmlFor="Casual Game">Casual</label>
    </div>
    <div>
      <input
      name="video"
        type="radio"
        id="Strategy"
        value="Strategy"
      />
      <label htmlFor="Strategy">Estrategia</label>
    </div>
    <div>
      <input
        name="video"
        type="radio"
        id="Simulator"
        value="Simulator"
      />
      <label htmlFor="Simulator">Simulacion</label>
    </div>
    <div>
      <input
        name="video"
        type="radio"
        id="Sports Game"
        value="Sports Game"
      />
      <label htmlFor="Sports Game">Deportes</label>
    </div>
    <div>
      <input
        name="video"
        type="radio"
        id="Action Game"
        value="Action Game"
      />
      <label htmlFor="Action Game">Accion</label>
    </div>
  </div>
  <form className="flex flex-col gap-8">
      <br></br>
          <button type="submit" className="btn btn-block btn-primary">
          Aplicar Filtro
        </button>
  </form>
 </div>
      </aside>
    </main>
    <article id="video">
    <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h2 className="card-title"><strong>Red Dead</strong></h2>
                <h5 className="card-text"><strong>Plataforma: </strong>Xbox</h5>
                <h5 className="card-text"><strong>Precio: $</strong>500$</h5>
                <button  className="btn btn-info my-2">Actualizar</button>
                <button  className="btn btn-danger">Eliminar</button>
            </div>
            <div className="card card-body">
                <h2 className="card-title"><strong>Red Dead</strong></h2>
                <h5 className="card-text"><strong>Plataforma: </strong>Xbox</h5>
                <h5 className="card-text"><strong>Precio: $</strong>500$</h5>
                <button  className="btn btn-info my-2">Actualizar</button>
                <button  className="btn btn-danger">Eliminar</button>
            </div>
        </div>
    </article>
  </body>
  );
};

export default Catalogo;