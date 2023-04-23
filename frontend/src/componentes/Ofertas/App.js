import './timer.css';
import React  from 'react';
import { useState, useEffect } from 'react';
import CountdownTimer from './CoundownTimer'
import * as OfertaServer from './OfertaServer'
import OfertaItem from './OfertaItem'
import Filtro from "../Filtro/FiltroLista";
const Timer = ({ idOferta }) => {
  const [ofertas, setOfertas] = useState([]);

  const listaOfertas = async () => {
      try {
          const data = await (await OfertaServer.getAllOfertas()).json();
          setOfertas(data.Ofertas); 
      } catch (error) {
          console.log(error);
      }
  };
  useEffect(() => {
    listaOfertas();
    // eslint-disable-next-line
}, []);


    return (
      <>
        <div className="App">
            <h1 id='h1'>Tiempo restante:</h1> 
         <CountdownTimer
         countdownTimestampMs={1704067200000}/>

          <Filtro />
        </div>

<div className="row">
{ofertas.map(oferta => (
    <OfertaItem key={oferta.id} idOferta={oferta.id} />
))}

</div>
</>
      );
}
export default Timer;