import React, { useState } from 'react';
import Logo from './media/logo2.png';
import IconPerfil from './media/iconperfil2.svg';
import IconOculto from './media/menusoculto.png';
import IconCarrito from './media/iconocarrito.svg';
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
import { listaCupones } from '../Cupon/Cupon';

const NavBar = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    switch(window.location.pathname){
      case "/catalogo":
      case "/xbox":
      case "/playstation":
      case "/nintendo":
      case "/pc":
        listaVideojuegos(search);
        break;
      case "/cupones":
        listaCupones(search);
        break;
      case "/monedaPeso":
        listaDivisas(search);
        break;
      default:
    }
  }

  return(
    <MDBNavbar expand='lg' light style={{backgroundColor:'#242325'}}>
      <MDBContainer fluid className='justify-content-center'>
        {/* BOTON CON ICONO DE INICIO */}
        <MDBNavbarBrand href='/home'>
          <img src={Logo} alt="logo" width="60" height="50" />
        </MDBNavbarBrand>

        <MDBNavbarToggler aria-controls='navbarSupportedContent' aria-expanded='false' onClick={() => setShowBasic(!showBasic)}>         
          <img src={IconOculto} alt="logo" width="40" height="40" />
        </MDBNavbarToggler>

        <MDBCollapse className= 'justify-content-center' navbar show={showBasic}>
          <MDBNavbarNav className='justify-content-center'>
            {/* Barra de busqueda react */}
            <div className="d-flex justify-content-center h-100">
              <Form onSubmit={handleSubmit}>
                <div className="searchbar">
                  <input
                    className="search_input mw-25"
                    type="search"
                    name=""
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <Button style={{backgroundColor:'#F6F8FF', border:'#F6F8FF'}} type="submit" className="search_icon"><i className="fas fa-search"></i></Button>
                </div>
              </Form>
            </div>
          </MDBNavbarNav>
          
          {/* Botón de perfil de usuario */}
          <MDBNavbarLink href='#' className=''>
            <img src={IconWishlist} alt="logo" width="40" height="40" />
          </MDBNavbarLink>

          <MDBNavbarLink href='#'className='mx-4 mb-4 mb-lg-0'>
            <img src={IconCarrito} alt="logo" width="40" height="40" />
          </MDBNavbarLink>

          <MDBDropdown>
            <MDBDropdownToggle tag='a' className='nav-link' role='button'>
              <img src={IconPerfil} alt="logo" width="40" height="40" />
            </MDBDropdownToggle>
            
            <MDBDropdownMenu>
              <MDBDropdownItem link href='/logIn'>Iniciar Sesión</MDBDropdownItem>
              <MDBDropdownItem link href='/signUp'>Crear cuenta</MDBDropdownItem>
              <MDBDropdownItem link href='/cupones'>Cupones</MDBDropdownItem>
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
    if(dato.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1)
      buscado.push(dato);
  });

  if(buscado.length === 0){
    window.alert("No hay resultados para tu búsqueda");
    buscado = data;
  }

  return buscado;
};