import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

//Componentes
import Navbar from "./componentes/NavBar/Navbar";
import Navbar2 from "./componentes/NavBar/Navbar2";
// import EmpleadoLista from './componentes/Empleado/EmpleadoLista';
import Catalogo from "./componentes/Catalogo/Catalogo";
import Timer from "./componentes/Ofertas/App";
import DivisaLista from "./componentes/Divisa/DivisaLista";
import DivisaForm from "./componentes/Divisa/DivisaForm";
import Cupones from "./componentes/Cupones/Cupones";
import Registro from "./componentes/RegistroUser/Register";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* NavBar principal */}
    <Navbar />

    {/* NavBar secundaria */}
    <Navbar2 />

    {/* <div className="container my-4"> */}

    <AuthProvider>
    <Routes>
      <Route exact path="/monedaPeso" element={<DivisaLista />} />
      <Route exact path="/monedaPeso/divisa/" element={<DivisaForm />} />
      <Route exact path="/monedaPeso/divisa/:id" element={<DivisaForm />} />
      <Route exact path="/ofertas" element={<Timer />} />
      <Route exact path="/cupones" element={<Cupones />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/registro" element={<Registro />} />
      {/* <Route path="/updateEmpleado/:id" element={<EmpleadoForm />} /> */}
    </Routes>
    </AuthProvider>
    {/* </div> */}
  </BrowserRouter>
);

reportWebVitals();
