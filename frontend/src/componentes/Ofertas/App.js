import './timer.css';
import React  from 'react';
import CountdownTimer from './CoundownTimer'
const Timer = () => {
    return (
        <div className="App">
            <h1>Tiempo restante:</h1> 
         <CountdownTimer
         countdownTimestampMs={1704067200000}/>
                 <div className="col">
                    <div className="card card-body">
                        <h2 className="card-title"><strong>DMC</strong></h2>
                        <img src="https://static.wikia.nocookie.net/devilmaycry/images/1/14/DmCCover.jpg/revision/latest?cb=20200107040835&path-prefix=es" class='card-img-top' alt='imagen'/>
                        <h5 className="card-text">Genero: </h5>
                        <h5 className="card-text">Precio: $ </h5>
                        <button className="btn btn-info my-2">Comprar</button>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-body">
                        <h2 className="card-title"><strong>Read</strong></h2>
                        <img src="https://static.wikia.nocookie.net/devilmaycry/images/1/14/DmCCover.jpg/revision/latest?cb=20200107040835&path-prefix=es" class='card-img-top' alt='imagen'/>
                        <h5 className="card-text">Genero: </h5>
                        <h5 className="card-text">Precio: $ </h5>
                        <button className="btn btn-info my-2">Comprar</button>
                    </div>
                </div>
        </div>
        
      );
}
export default Timer;