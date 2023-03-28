import './timer.css';
import React  from 'react';
import CountdownTimer from './CoundownTimer'
const Timer = () => {
    return (
        <div className="App">
            <h1 id='h1'>Tiempo restante:</h1> 
         <CountdownTimer
         countdownTimestampMs={1704067200000}/>

<aside id="categoria">
   <div id="hola">
    <h4 className="text-black text-lg" >Categorias</h4>
      <input name ="video"type="radio" id="indy" value="indy"/>
      <label htmlFor="indy">Indies</label>
    <div>
      <input
      name="video"
        type="radio"
        id="Adventure"
        value="Adventure"
      />
      <label htmlFor="Adventure">Aventura</label>
    <div>
      <input name="video"type="radio" id="MMO" value="MMO"/>
      <label htmlFor="MMO">MMO</label>
    </div>
    <div>
      <input
      name="video"
        type="radio"
        id="Casual Game"
        value="Casual Game"
      />
      <label htmlFor="Casual Game">Casual</label>
    </div>
    <div>
      <input
      name="video"
        type="radio"
        id="Strategy"
        value="Strategy"
      />
      <label htmlFor="Strategy">Estrategia</label>
    </div>
    <div>
      <input
        name="video"
        type="radio"
        id="Simulator"
        value="Simulator"
      />
      <label htmlFor="Simulator">Simulacion</label>
    </div>
    <div>
      <input
        name="video"
        type="radio"
        id="Sports Game"
        value="Sports Game"
      />
      <label htmlFor="Sports Game">Deportes</label>
    </div>
    <div>
      <input
        name="video"
        type="radio"
        id="Action Game"
        value="Action Game"
      />
      <label htmlFor="Action Game">Accion</label>
    </div>
  </div>
  <form className="flex flex-col gap-8">
      <br></br>
          <button type="submit" className="btn btn-block btn-primary">
          Aplicar Filtro
        </button>
  </form>
 </div>
      </aside>

                 <div className="col">
                    <div className="card card-body">
                        <h2 className="card-title"><strong>DMC</strong></h2>
                        <img src="https://static.wikia.nocookie.net/devilmaycry/images/1/14/DmCCover.jpg/revision/latest?cb=20200107040835&path-prefix=es" class='card-img-top' alt='imagen'/>
                        <h5 className="card-text">Genero: </h5>
                        <h5 className="card-text">Descuento % </h5>
                        <button className="btn btn-info my-2">Comprar</button>
                    </div>
                </div>
        </div>
      );
}
export default Timer;