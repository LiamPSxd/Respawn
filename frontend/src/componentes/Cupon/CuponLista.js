import React, { useEffect, useState } from "react";
import style from "./Cupon.module.css"
<<<<<<< HEAD:frontend/src/componentes/Cupon/Cupon.js
import * as CuponServer from './CuponServer';
import { recuperarBusqueda } from "../NavBar/NavBar";
import ModalCupon from "./ModalCupon";


let [cupones, setCupones] = [];
var conexionBD = false;
const Cupon = () => {
=======
import * as CuponServer from "./CuponServer";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";
import CuponItem from "./CuponItem";

let [cupones, setCupones] = [];

const CuponLista = () => {
>>>>>>> 154709bdba7e4378296d81095addb3bb80d815c3:frontend/src/componentes/Cupon/CuponLista.js
    [cupones, setCupones] = useState([]);

    useEffect(() => {
        listaCupones(null);
        // eslint-disable-next-line
    },[]);

<<<<<<< HEAD:frontend/src/componentes/Cupon/Cupon.js
    function comprobacion(conexionBD){
        if(conexionBD === false){
            return <ModalCupon/>
        }else{
            return (<><div id={style.cabecera}>
                
            </div>
    
            <div id={style.contenedorTarjetas}>
                {cupones.map(cupon => (
                    <div id={style.tarjeta} className="card" key={cupon.id}>
                        <img id={style.imgCard} src={cupon.imagen} className="card-image-top" alt=""/>
                        <div className="card-body" id={style.cuerpoTarjeta}>
                            <h5>{cupon.nombre}</h5>
                            <p>{cupon.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div></>)
        }
    }
    return(
        comprobacion(conexionBD)
=======
    return(
        <><div id={style.cabecera}>
            <h1>Cupones disponibles</h1>
        </div>

        <div id={style.contenedorTarjetas}>
            {cupones.map(cupon => (
                <CuponItem  key={cupon.id} cupon={cupon} />
            ))}
        </div></>
>>>>>>> 154709bdba7e4378296d81095addb3bb80d815c3:frontend/src/componentes/Cupon/CuponLista.js
    );
};

export default CuponLista;

export const listaCupones = async (busqueda) => {
    try{
        const data = await (await CuponServer.getCupones()).json();
        if(busqueda == null) setCupones(data.Cupones);
        else setCupones(recuperarBusqueda(busqueda, data.Cupones));
        conexionBD = true;
    }catch(error){
        console.log(conexionBD);
        console.log(error);
    }
};