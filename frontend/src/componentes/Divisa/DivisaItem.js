import React from 'react';
import * as DivisaServer from "./DivisaServer";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";

const DivisaItem = ({ divisa, listaDivisas, divisas, updateCurrencies }) => {
    const handleCambioDivisa = async (newDiv) => {
        await divisas.forEach(async oldDiv => {
            if(oldDiv.seleccionado === "True"){
                oldDiv.seleccionado = "False";
                newDiv.seleccionado = "True";

                await DivisaServer.updateDivisa(oldDiv);
                await DivisaServer.updateDivisa(newDiv);
            }
        });

        const dataVideojuegos = await (await VideojuegoServer.getAllVideojuegos()).json();
        await dataVideojuegos.Videojuegos.forEach(async videojuego => {
            const precio = videojuego.precio.split(" ");
            const data = await (await DivisaServer.getConversion(precio[1], newDiv.simbolo, precio[0])).json();

            videojuego.precio = data.conversion_result.toFixed(2) + ` ${newDiv.simbolo}`;
            await VideojuegoServer.updateVideojuego(videojuego);

            if(dataVideojuegos.Videojuegos.at(-1).id === videojuego.id) listaDivisas();
        });

        await updateCurrencies(divisas, newDiv.simbolo);
    };

    return(
        <><div className="col-sm">
            <div className="card card-body">
                <h1 className="card-title"><strong>{divisa.nombre}</strong></h1>
                <h4 className="card-text">{divisa.pais}</h4>
                <h4 className="card-text">{divisa.valor} {divisa.simbolo}</h4>

                {divisa.seleccionado === "True" ? (
                    <button className="btn btn-success my-2" disabled>Seleccionado</button>
                ) : (
                    <button onClick={() => handleCambioDivisa(divisa)} className="btn btn-primary my-2">Seleccionar</button>
                )}
            </div>
        </div></>
    );
};

export default DivisaItem;