import React from "react";
import * as DivisaServer from "./DivisaServer";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import style from "./Divisa.module.css";
import { useEffect } from "react";
import { useState } from "react";
// import Mensaje from '../Mensaje/Mensaje';

const DivisaItem = ({ divisa, listaDivisas, divisas, updateCurrencies }) => {
    // const [titulo, setTitulo] = useState(null);
    // const [contenido, setContenido] = useState(null);

    const [fontSize, setFontSize] = useState(0);

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
            const data = await (await DivisaServer.getConversion(videojuego.precio.simbolo, newDiv.simbolo, videojuego.precio.valor)).json();

            videojuego.precio.valor = data.conversion_result.toFixed(2);
            videojuego.precio.simbolo = newDiv.simbolo;
            await VideojuegoServer.updateVideojuego(videojuego);

            if(dataVideojuegos.Videojuegos.at(-1).id === videojuego.id){
                listaDivisas();
            }
        });

        await updateCurrencies(divisas, newDiv.simbolo);
        await verificarCambio(divisa.simbolo);
    };

    const verificarCambio = async (simbolo) => {
        const data = (await (await VideojuegoServer.getVideojuego(0)).json()).Videojuegos[0];

        if(data.precio.simbolo === simbolo){
            // setTitulo("Éxito");
            // setContenido("Modena aplicada con éxito");
            console.log("Modena aplicada con éxito");
        }else{
            // setTitulo("No se aplicó la divisa en el sistema");
            // setContenido("Moneda no aplicada correctamente. Por favor, intente más tarde");
            console.log("Moneda no aplicada correctamente. Por favor, intente más tarde");
        }
    };

    const handleTitulo = () => {
        const titulo = divisa.nombre.length;

        switch(titulo !== null){
            case titulo <= 8:
                setFontSize(2.75);
                break;
            case titulo > 8 && titulo <= 16:
                setFontSize(2.4);
                break;
            case titulo > 16 && titulo < 24:
                setFontSize(2.05);
                break;
            default:
                setFontSize(1.7);
        }
    };

    useEffect(() => {
        handleTitulo();
        // eslint-disable-next-line
    }, []);


    return(
        <><div id={style.tarjeta} className="card">
            <div id={style.cardBody} className="card-body">
                <h1 id={style.titulo} style={{fontSize: fontSize + "em"}} className="card-title">{divisa.nombre}</h1>

                <div id={style.contenidoTarjeta}>
                    <h4 className="card-text text-muted">{divisa.pais}</h4>
                    <h4 className="card-text">{divisa.valor} {divisa.simbolo}</h4>
                </div>

                <div className="card-footer bg-transparent">
                    {divisa.seleccionado === "True" ? (
                        <button id={style.boton} className="btn btn-success my-2" disabled>Seleccionado</button>
                    ) : (
                        <button id={style.boton} onClick={() => handleCambioDivisa(divisa)} className="btn btn-primary my-2">Seleccionar</button>
                    )}
                </div>

                {/* <Mensaje titulo={titulo} contenido={contenido} estado={false} /> */}
            </div>
        </div></>
    );
};

export default DivisaItem;