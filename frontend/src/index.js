import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Componentes
import NavBar from "./componentes/NavBar/MDBNavBar";
import NavBar2 from "./componentes/NavBar/MDBNavBar2";
import Catalogo from "./componentes/Catalogo/CatalogoLista";
import Oferta from "./componentes/Oferta/OfertaLista";
import Divisa from "./componentes/Divisa/DivisaLista";
import Cupon from "./componentes/Cupon/CuponLista";
import SignUp from "./componentes/Usuario/UsuarioSignUp";
import LogIn  from "./componentes/Usuario/UsuarioLogIn";
import Home from "./componentes/Usuario/UsuarioHome";
import Videojuego from "./componentes/Videojuego/VideojuegoForm";
import Pago from "./componentes/Pago/PagoForm";
import Tarjeta from "./componentes/Tarjeta/TarjetaForm";
import PayPal from "./componentes/PayPal/PayPalForm";
import Carrito from "./componentes/Carrito/Carrito";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* NavBar principal */}
    <NavBar />

    {/* NavBar secundaria */}
    <NavBar2 />

    <Routes>
      <Route exact path="/monedaPeso" element={<Divisa />} />
      <Route exact path="/ofertas" element={<Oferta />} />
      <Route exact path="/cupones" element={<Cupon />} />
      <Route exact path="/catalogo" element={<Catalogo idCatalogo={0} />} />
      <Route exact path="/xbox" element={<Catalogo idCatalogo={1} />} />
      <Route exact path="/playstation" element={<Catalogo idCatalogo={2} />} />
      <Route exact path="/nintendo" element={<Catalogo idCatalogo={3} />} />
      <Route exact path="/pc" element={<Catalogo idCatalogo={4} />} />
      <Route exact path="/videojuego/:id" element={<Videojuego />} />
      <Route exact path="/pago/:id" element={<Pago />} />
      <Route exact path="/pago/:id/tarjeta" element={<Tarjeta />} />
      <Route exact path="/pago/:id/paypal" element={<PayPal />} />
      <Route exact path="/signUp" element={<SignUp />} />
      <Route exact path="/logIn" element={<LogIn />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/carrito" element={<Carrito />} />
    </Routes>

  </BrowserRouter>
);

reportWebVitals();