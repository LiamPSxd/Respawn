import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

//Componentes
import NavBar from "./componentes/NavBar/NavBar";
import NavBar2 from "./componentes/NavBar/NavBar2";
import Catalogo from "./componentes/Catalogo/CatalogoLista";
import Timer from "./componentes/Ofertas/App";
import Divisa from "./componentes/Divisa/DivisaLista";
import Cupon from "./componentes/Cupon/Cupon";
import Registro from "./componentes/RegistroUser/Register";
import Login  from "./componentes/Login/Login";
import Home from "./componentes/Homepage/Home";
import Videojuego from "./componentes/Videojuego/VideojuegoForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* NavBar principal */}
    <NavBar />

    {/* NavBar secundaria */}
    <NavBar2 />

    <AuthProvider>
      <Routes>
        <Route exact path="/monedaPeso" element={<Divisa />} />
        <Route exact path="/ofertas" element={<Timer />} />
        <Route exact path="/cupones" element={<Cupon />} />
        <Route exact path="/catalogo" element={<Catalogo idCatalogo={0} />} />
        <Route exact path="/xbox" element={<Catalogo idCatalogo={1} />} />
        <Route exact path="/playstation" element={<Catalogo idCatalogo={2} />} />
        <Route exact path="/nintendo" element={<Catalogo idCatalogo={3} />} />
        <Route exact path="/pc" element={<Catalogo idCatalogo={4} />} />
        <Route exact path="/videojuego/:id" element={<Videojuego />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();