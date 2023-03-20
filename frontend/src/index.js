import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Componentes
import Navbar from './componentes/NavBar/Navbar';
import Navbar2 from './componentes/NavBar/Navbar2';
import EmpleadoLista from './componentes/Empleado/EmpleadoLista';
import Catalogo from './componentes/Empleado/Catalogo';

import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* NavBar principal */}
    <Navbar />
    
    {/* NavBar secundaria */}
    <Navbar2 />
    <div className="container my-4">
      <Routes>
        <Route exact path="/" element={<EmpleadoLista />} />
        <Route path="/catalogo" element={<Catalogo />} />
        {/* <Route path="/updateEmpleado/:id" element={<EmpleadoForm />} /> */}
      </Routes>
    </div>
  </BrowserRouter>
);

reportWebVitals();