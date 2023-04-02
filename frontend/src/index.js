import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

//Componentes
import Navbar from "./componentes/NavBar/NavBar";
import Navbar2 from "./componentes/NavBar/NavBar2";
import Catalogo from "./componentes/Catalogo/CatalogoLista";
import Timer from "./componentes/Ofertas/App";
import Divisa from "./componentes/Divisa/DivisaLista";
import Cupon from "./componentes/Cupon/Cupon";
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

    <AuthProvider>
      <Routes>
        <Route exact path="/monedaPeso" element={<Divisa />} />
        <Route exact path="/ofertas" element={<Timer />} />
        <Route exact path="/cupones" element={<Cupon />} />
        <Route exact path="/catalogo" element={<Catalogo idCatalogo={1} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();