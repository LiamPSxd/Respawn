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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
