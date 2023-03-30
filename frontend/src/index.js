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
import Cupon from "./componentes/Cupon/Cupon";
import Registro from "./componentes/RegistroUser/Register";
import Login  from "./componentes/Login/Login";
import Home from "./componentes/Homepage/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import VideojuegoForm from "./componentes/Videojuego/VideojuegoForm";

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
      <Route exact path="/cupones" element={<Cupon />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/videojuego/:id" element={<VideojuegoForm/>} />
    </Routes>
  </AuthProvider>
    {/* </div> */}
  </BrowserRouter>
);

reportWebVitals();