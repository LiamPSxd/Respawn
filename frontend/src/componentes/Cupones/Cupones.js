import React, { useEffect, useState } from "react";
import style from "./Cupones.module.css"
import haloImage from "./imagenesCupones/Halo.gif"
import kratosImage from "./imagenesCupones/Kratos.gif"
import marioImage from "./imagenesCupones/Mario.gif"
import teamImage from "./imagenesCupones/Team.gif"
import { useNavigate } from "react-router-dom";
import * as CuponesServer from './CuponesServer';

const Cupones=()=>{
    // const history = useNavigate();
    // const [cupones, setCupones] = useState([]);
    // const listaCupones = async() =>{
    //     try {
    //         const response = await CuponesServer.getCupones();
    //         const data = await response.json();
    //         setCupones(data.cupones); 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(()=>{
    //     listaCupones();
    // },[]);

    let cupon1=[haloImage, "Cupón Bienvenida", "Obten un 15% de descuento en tu primera compra",0]
    let cupon2=[kratosImage, "Cupón De Envío Gratis", "Tu próximo envío a domicilio de un juego en formato físico es gratis",1]
    let cupon3=[marioImage, "Cupón 2x1", "En la compra de dos juegos menores a $100 mxn paga solo uno",2]
    let cupon4=[teamImage, "Cupón De Descuento", "Obtén un 5% de descuento en compras mayores a $1,500 mxn",3]
    let cupones = [cupon1, cupon2, cupon3, cupon4]
    return(
        <>
        <div id={style.cabecera}>
            <h1>Cupones disponibles</h1>
        </div>
        <div id={style.contenedorTarjetas}>
            {cupones.map((cupon)=>(
                <div id={style.tarjeta} className="card">
                    <img id={style.imgCard} src={cupon[0]} className="card-image-top" alt=""/>
                    <div className="card-body" id={style.cuerpoTarjeta}>
                        <h5>{cupon[1]}</h5>
                        <p>{cupon[2]}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};
export default Cupones;