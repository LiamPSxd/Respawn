import React, { useState } from 'react';
import Logo from './logo2.png';
import IconPerfil from './iconperfil2.svg';
import IconOculto from './menusoculto.png';
import IconCarrito from './iconocarrito.svg';
import IconWishlist from './wishlist.svg';
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

export default function App() {
  const [showBasic, setShowBasic] = useState(false);

  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //recuperaBusqueda(search)
  }

  return (
    <MDBNavbar expand='lg' light style={{backgroundColor:'#242325'}}>
      <MDBContainer fluid className='justify-content-center'>
        {/* BOTON CON ICONO DE INICIO */}
        <MDBNavbarBrand href='/home'>
        <img src={Logo} alt="logo" width="60" height="50" />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          onClick={() => setShowBasic(!showBasic)}
        >
         
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
<<<<<<< HEAD
                  <MDBDropdownItem link href='/iniciodesesion'>Iniciar Sesión</MDBDropdownItem>
                  <MDBDropdownItem link href='/registro'>Crear cuenta</MDBDropdownItem>
=======
                  <MDBDropdownItem link>Iniciar Sesión</MDBDropdownItem>
                  <MDBDropdownItem link>Crear cuenta</MDBDropdownItem>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  <MDBDropdownItem link href='/cupones'>Cupones</MDBDropdownItem>
=======
>>>>>>> d61cf446677f602c7779556e7167e635d3b29184
>>>>>>> 7f3566f6187a9c57b7b7a1bcb9da105caf517a12
=======
>>>>>>> d61cf446677f602c7779556e7167e635d3b29184
>>>>>>> 7f3566f6187a9c57b7b7a1bcb9da105caf517a12
=======
>>>>>>> d61cf446677f602c7779556e7167e635d3b29184
>>>>>>> b2ddcde8ba2c26a5b6ce3bd309b3ef54b1ec7561
                </MDBDropdownMenu>
              </MDBDropdown>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}