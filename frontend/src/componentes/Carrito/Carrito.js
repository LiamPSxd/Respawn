import React,{ useState } from "react";
import './Carrito.css';
import moment from 'moment';
import Cookies from "universal-cookie";
import IconCarrito from './media/iconocarrito.svg';
import 'moment/locale/es';

const Carrito = () => {
    const fechaActual = moment().format('LL'); 
    const cookies = new Cookies();

    const [usuario] = useState({ id: cookies.get("id"), nombre: cookies.get("nombre"), correo: cookies.get("correo"), contrasenia: cookies.get("contrasenia"), domicilio: cookies.get("domicilio") });

    return (
    
      <body className="bodyCart">
  <div id="w">
    <header id="title">
      <h1 className="h1Cart">HTML5/CSS3 Shopping Cart UI</h1>
    </header>
    <div id="page">
      <table id="cart">
        <thead>
          <tr>
            <th class="first"></th>
            <th class="third">Nombre del Videojuego</th>
            <th class="fourth">Precio</th>
            <th class="fifth">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- shopping cart contents --> */}
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
           <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
           <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          <tr class="productitm">
            {/* <!-- http://www.inkydeals.com/deal/ginormous-bundle/ --> */}
            <td><img src="https://i.imgur.com/8goC6r6.png" class="thumb"/></td>
            <td>Design Bundle Package</td>
            <td>$79.00</td>
            <td><span class="remove"><img src="https://i.imgur.com/h1ldGRr.png" alt="X"/></span></td>
          </tr>
          
          
          {/* <!-- tax + subtotal --> */}
          <tr class="extracosts">
            <td class="light">Shipping &amp; Tax</td>
            <td colspan="2" class="light"></td>
            <td>$35.00</td>
            <td>&nbsp;</td>
          </tr>
          <tr class="totalprice">
            <td class="light">Total:</td>
            {/* <td colspan="2">&nbsp;</td> */}
            <td colspan="2"><span class="thick">$225.45</span></td>
          </tr>
          
          {/* <!-- checkout btn --> */}
          <tr class="checkoutrow">
            <td colspan="5" class="checkout"><button id="submitbtn">Checkout Now!</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>

    );
};

export default Carrito;