import React, { useState } from 'react';
import Logo from './media/logorespawn.svg';
import IconPerfil from './media/iconperfil2.svg';
import IconOculto from './media/menusoculto.png';
import IconWishlist from './media/wishlist.svg';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { listaVideojuegos } from '../Videojuego/VideojuegoLista';
import { listaDivisas } from '../Divisa/DivisaLista';
import { listaCupones } from '../Cupon/CuponLista';
import { listaOfertas } from '../Oferta/OfertaLista';
import { getVideojuegos, wishListId } from '../WishList/WishListItem';
import { idFiltro } from '../Filtro/FiltroLista';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
  const history = useNavigate();

  const cookies = new Cookies();

  const [usuario] = useState({ id: cookies.get("id"), nombre: cookies.get("nombre"), correo: cookies.get("correo"), contrasenia: cookies.get("contrasenia"), domicilio: cookies.get("domicilio") });
  const [showBasic, setShowBasic] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogOut = async () => {

    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {

      cookies.set("id", null, { path: "/" });
      cookies.remove("id");
      cookies.remove("nombre");
      cookies.remove("correo");
      cookies.remove("contrasenia");
      cookies.remove("domicilio");

      history("/");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search === "") {
      window.alert("Búsqueda vacía")
    } else {

      switch (window.location.pathname) {
        case "/catalogo":
        case "/xbox":
        case "/playstation":
        case "/nintendo":
        case "/pc":
          listaVideojuegos(search, idFiltro);
          break;
        case "/cupones":
          listaCupones(search);
          break;
        case "/monedaPeso":
          listaDivisas(search);
          break;
        case "/ofertas":
          listaOfertas(search);
          break;
        case "/wishlist":
          getVideojuegos(search, wishListId);
          break;
        default:
          break;
      }
    }
  }

  return (
    <MDBNavbar expand='sm' light id={style.navbar}>
      <MDBContainer fluid className='justify-content-center'>
        {/* BOTON CON ICONO DE INICIO */}
        <MDBNavbarBrand href='/home'>
          <img src={Logo} alt="logo" width="80" height="80" />
        </MDBNavbarBrand>

        <MDBNavbarToggler aria-controls='navbarSupportedContent' aria-expanded='false' onClick={() => setShowBasic(!showBasic)}>
          <img src={IconOculto} alt="logo" width="40" height="40" />
        </MDBNavbarToggler>

        <MDBCollapse className='justify-content-center ' navbar show={showBasic}>
          <MDBNavbarNav className='justify-content-center'>
            {/* Barra de busqueda react */}
            <div className="d-flex justify-content-center h-100 ">
              <Form onSubmit={handleSubmit}>
                <div className="searchbar" id={style.searchDiv}>
                  <input
                    className="search_input mw-25"
                    type="search"
                    name=""
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <Button style={{ backgroundColor: '#F6F8FF', border: '#F6F8FF' }} type="submit" className="search_icon"><i className="fas fa-search"></i></Button>
                </div>
              </Form>
            </div>
          </MDBNavbarNav>

          {
            usuario.correo ? (
              <>
                <MDBNavbarLink href='/wishlist' className=''>
                  <img src={IconWishlist} alt="logo" width="40" height="40" />
                </MDBNavbarLink>
              </>
            ) : (
              <></>
            )
          }

          <MDBDropdown className='d-flex justify-content-center mt-2'>
            <MDBDropdownToggle tag='a' className='nav-link' role='button'>
              <img src={IconPerfil} alt="logo" width="40" height="40" />
            </MDBDropdownToggle>

            <MDBDropdownMenu>
              {
                usuario.correo ? (
                  <>
                    <MDBDropdownItem link href='/cupones'>Cupones</MDBDropdownItem>
                    <MDBDropdownItem link href='/catalogo' onClick={handleLogOut}>Cerrar Sesión</MDBDropdownItem>
                  </>
                ) : (
                  <>
                    <MDBDropdownItem link href='/logIn'>Iniciar Sesión</MDBDropdownItem>
                    <MDBDropdownItem link href='/signUp'>Crear cuenta</MDBDropdownItem>
                  </>
                )
              }
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavBar;

export const recuperarBusqueda = (busqueda, data = []) => {
  let buscado = [];

  data.forEach(dato => {
    if (dato.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1)
      buscado.push(dato);
  });

  if (buscado.length === 0) {
    window.alert("No hay resultados para tu búsqueda");
    buscado = data;
  }

  return buscado;
};