import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

//Componentes
import Navbar from "./componentes/NavBar/Navbar";
import Navbar2 from "./componentes/NavBar/Navbar2";
import Catalogo from "./componentes/Catalogo/Catalogo";
import Timer from "./componentes/Ofertas/App";
import DivisaLista from "./componentes/Divisa/DivisaLista";
import Cupones from "./componentes/Cupones/Cupones";
import Registro from "./componentes/RegistroUser/Register";
import Login  from "./componentes/Login/Login";
import Home from "./componentes/Homepage/Home";

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
        <Route exact path="/ofertas" element={<Timer />} />
        <Route exact path="/cupones" element={<Cupones />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </AuthProvider>
    {/* </div> */}
  </BrowserRouter>
);

reportWebVitals();