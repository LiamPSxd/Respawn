import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Cookies from "universal-cookie";
import style from "./Compra.module.css";
import * as CompraServer from "./CompraServer";
import * as TarjetaServer from "../Tarjeta/TarjetaServer"
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import { memo } from "react";


const CompraItem = () => {
    const history = useNavigate();
    const cookies = new Cookies();
    var idTarjeta = cookies.get("idTarjeta");
    var idVideojuego = cookies.get("videojuegoId");
    var idUsuario = cookies.get("id");
    var cvvC = 0;
    const [compra, setCompra] = useState({ id: 0, fecha: "", hora: "", iva: .16, descuento: 0, monto: "", metodo: "", descripcion: "", idUsuario: 0, idVideojuego: 0 });
    const [videojuego, setVideojuego] = useState({ id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] });
    const [tarjeta, setTarjeta] = useState({ saldo: 0.0, tipo: "", pan: "", fechaCaducidad: "", cvv: 0, titular: "" });

    const getAllCompras = async () => {
        try {
            const data = await (await CompraServer.getAllCompras()).json();
            data.Compras.forEach(compra => {
                if(compra.idUsuario===idUsuario && compra.idVideojuego===idVideojuego){
                    const { id, fecha, hora, iva, descuento, monto, metodo, descripcion, idUsuario, idVideojuego } = compra;
                    setCompra({id, fecha, hora, iva, descuento, monto, metodo, descripcion, idUsuario, idVideojuego });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getVideojuego = async (idVideojuego) => {
        try {
            const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
            const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas } = data.Videojuegos[0];
            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas });
        } catch (error) {
            console.log(error);
        }
    };

    const getTarjeta = async (idTarjeta) => {
        try {
            const data = await (await TarjetaServer.getTarjetasById(idTarjeta)).json();
            const {id, saldo, tipo, pan, fechaCaducidad, cvv, titular } = data.Tarjetas[0];
            setTarjeta({id, saldo, tipo, pan, fechaCaducidad, cvv, titular });
        } catch (error) {
            console.log(error);
        }
    };

    const procesarCompra = async () => {
        if(compra.id===0){
            if (cvvC == tarjeta.cvv) {
                try {
                    compra.idVideojuego = idVideojuego;
                    compra.idUsuario = idUsuario;
                    compra.fecha = moment().format('L');
                    compra.hora = moment().format('LT');
                    compra.metodo = idTarjeta;
                    compra.monto = videojuego.precio.valor + videojuego.precio.simbolo;
                    compra.descripcion = videojuego.nombre;
                    await (await CompraServer.addCompra(compra)).json();
                    document.getElementById("btnConfirmar").style.visibility = "hidden";
                    document.getElementById("btnTicket").style.visibility = "visible";
                    tarjeta.saldo=tarjeta.saldo-videojuego.precio.valor;
                    const data= await (await TarjetaServer.updateTarjeta(tarjeta)).json();
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            } else (
                window.alert("CVV incorrecto")
            )
        }else(
            window.alert("Ya existe una compra")
        )
    };

    const verTicket = async () => {
        history("/ticket")
    };

    const handleInputChange = (e) => {
        cvvC = e.target.value;
    }

    useEffect(() => {
        getAllCompras()
        document.getElementById("btnConfirmar").style.visibility = "visible";
        document.getElementById("btnTicket").style.visibility = "hidden";
        getVideojuego(idVideojuego);
        getTarjeta(idTarjeta)
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={style.html2}>
                <div className={style.compraBox}>
                    <h2>Finalizar compra</h2>
                    <div className={style.userBox}>
                        <label className={style.label}>Confirma el CVV</label>
                        <input className={style.input} type="password" placeholder="Confirma el CVV" onChange={handleInputChange} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button className={style.a} id="btnConfirmar" onClick={procesarCompra}>Confirmar</button>
                        <button className={style.a} id="btnTicket" onClick={verTicket}>Ver ticket</button>
                    </div>
                </div>
            </div>
        </>
    );

}
export default memo(CompraItem)