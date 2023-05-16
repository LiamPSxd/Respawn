import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,

  MDBCollapse,
} from 'mdb-react-ui-kit';
import style from "./NavBar.module.css"

const NavBar2 = () => {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='sm' light style={{ backgroundColor: '#72020b', padding: "3vh 3vh"}}>
      <MDBContainer fluid>
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mx-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink id={style.links} href='/catalogo'>Catálogo</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink id={style.links} href='/ofertas'>Ofertas</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink id={style.links} href='/xbox'>Xbox</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink id={style.links} href='/playstation'>PlayStation</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink id={style.links} href='/nintendo'>Nintendo</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink id={style.links} href='/pc'>PC</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink id={style.links} href='/monedaPeso' style={{ align: "right" }}>Moneda</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavBar2;