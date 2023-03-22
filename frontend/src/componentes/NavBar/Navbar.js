// import React from 'react'
// import { Link } from "react-router-dom";
// import Logo from './logo2.png';
// const Navbar = () => {
//   return(
//     <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="empleadoForm">
//         <img src={Logo} alt="logo" width="60" height="50" />
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
// {/* Elements del menu colapse */}
//         <div class="collapse navbar-collapse" id="menu">
//           <ul class="navbar-nav me-auto">
//             <li class="nav-item">
//               <a class="nav-link" href="/">Visualizar</a>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/empleadoForm">
//                 Agregar
//               </Link>
//             </li>
//           </ul>
//         </div>
//         {/* Boton de menu opciones */}
//         <Link className="profileOptions" to="/">
//           Perfil
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           {/* <span className="navbar-toggler-icon"></span> */}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

export default function App() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' dark bgColor='dark'>
      <MDBContainer fluid className='justify-content-center'>
        {/* BOTON CON ICONO DE INICIO */}
        <MDBNavbarBrand href='/'>
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
          <form className='d-flex input-group w-50 mx-4 mb-4 mb-lg-0'>
            <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
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
                  <MDBDropdownItem link>Iniciar Sesión</MDBDropdownItem>
                  <MDBDropdownItem link>Crear cuenta</MDBDropdownItem>
                  <MDBDropdownItem link href='/cupones'>Cupones</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}