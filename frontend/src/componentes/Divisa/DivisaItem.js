import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as DivisaServer from "./DivisaServer";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";

const DivisaItem = ({divisa}) => {
    const history = useNavigate();

    const handleCambioDivisa = async (newDiv) => {
        const dataDivisas = await (await DivisaServer.getAllDivisas()).json();
        await dataDivisas.Divisas.forEach(oldDiv => {
            if(oldDiv.seleccionado){
                oldDiv.seleccionado = false;
                newDiv.seleccionado = true;

                DivisaServer.updateDivisa(oldDiv);
                DivisaServer.updateDivisa(newDiv);
            }
        });

        const dataVideojuegos = await (await VideojuegoServer.getAllVideojuegos()).json();
        await dataVideojuegos.Videojuegos.forEach(videojuego => {
            let precio = "";
            for(let letra of videojuego.precio){
                if(letra != " ") precio += letra;
                else if(letra == " ") break;
            }

            console.log(precio);
            console.log(newDiv.valor);
            console.log(parseInt(precio)/parseInt(newDiv.valor));

            videojuego.precio = String(parseFloat(parseFloat(precio) / parseFloat(newDiv.valor))) + ` ${newDiv.simbolo}`;
            VideojuegoServer.updateVideojuego(videojuego);
        });

        history('/monedaPeso');
    };

    return(
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h1 className="card-title"><strong>{divisa.nombre}</strong></h1>
                <h4 className="card-text">{divisa.pais}</h4>
                <h4 className="card-text">{divisa.valor} {divisa.simbolo}</h4>

                {divisa.seleccionado === true ? (
                    <button className="btn btn-success my-2" disabled>Seleccionado</button>
                ) : (
                    <button onClick={() => handleCambioDivisa(divisa)} className="btn btn-primary my-2">Seleccionar</button>
                )}
            </div>
        </div>
    );
};

export default DivisaItem;