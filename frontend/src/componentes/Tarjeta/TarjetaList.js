import React, {memo, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Style from "./Tarjeta.module.css"
import TarjetaItem from "./TarjetaItem";
import * as TarjetaServer from "./TarjetaServer"
import Cookies from "universal-cookie";

const TarjetaList = () =>{
    const [tarjetas, setTarjetas] = useState([]);
    const cookies = new Cookies();
    let idUsuario = cookies.get("id")
    const getContenido = async () =>{
        var idTarjetas = "";
        const dataUsuarioTarjetas = await (await TarjetaServer.getUsuarioTarjetasById(idUsuario)).json();
        if(dataUsuarioTarjetas['message'] !== "Fallido. Posiblemente no hay dato(s)" ){
            await dataUsuarioTarjetas.UsuarioTarjetas.forEach(it =>{
                idTarjetas += it.idTarjeta + ",";
            });
            return idTarjetas
        }else{
            return false
        }
    }
    
    const listaTarjetas = async () =>{
        try {
            const res = await TarjetaServer.getTarjetasById(await getContenido());
            const data = await res.json();
            setTarjetas(data.Tarjetas)    
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listaTarjetas()        
        // eslint-disable-next-line
    }, []); 

    return(
        <>
        <div className="list-group" id={Style.containerTarjetas}>
            <h4><strong>Mis Tarjetas</strong></h4>
            <p>Selecciona una tarjeta para continuar</p>
            <ol className="list-group" id={Style.olTarjetas}>
                    {tarjetas != null ? (
                        tarjetas.map((tarjeta)=>(
                            <TarjetaItem key={tarjeta.id} tarjeta={tarjeta}/>
                        ))
                    ):(
                        <h1>No exiten tarjetas guardadas</h1>
                    )}
            </ol>
            <Link to="/tarjetaForm" id={Style.link}>Agregar Tarjeta</Link>
        </div>
        </>
    );
}
export default memo(TarjetaList);