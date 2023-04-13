import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as VideojuegoServer from './VideojuegoServer';


const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const searchInput = form.elements.search.value;
  // Vamos a suponer que "option1" y "option2" son tus checkbox de la lista que te 
  // genera el HTML, en tu caso sería, indies, aventura, etc, tenemos que validar    // que estes seleccionandolo 
  const option1 = form.elements.option1.checked;
  const option2 = form.elements.option2.checked;
  
  // Posteriormente hay que pues hacer los filtros correspondientes para consumir 
  // el API, hay que recordar que esté es un ejemplo con una sentencia GET en caso 
  // que sea POST o algún otro dime.
  const url = `/api/search?search=${searchInput}&option1=${option1}&option2=${option2}`;

  // Llamamos el API con la URL construida usando fetch o Axios, recuerdá que        //siempre puedes integrarlo en un try&catch para ubicar errores
  const response = await fetch(url);
  const data = await response.json();
});