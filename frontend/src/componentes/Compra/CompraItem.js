import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Cookies from "universal-cookie";
import style from "./Compra.module.css";
import * as CompraServer from "./CompraServer";
import * as TarjetaServer from "../Tarjeta/TarjetaServer"
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import * as CompraVideojuegoServer from "./Relacion/CompraVideojuegoServer";
import * as UsuarioCompraServer from "../Usuario/Relacion/UsuarioCompraServer";
import { memo } from "react";


const CompraItem = () => {
    const history = useNavigate();
    const cookies = new Cookies();
    var idTarjeta = cookies.get("idTarjeta");
    var idVideojuego = cookies.get("videojuegoId");
    var idUsuario = cookies.get("id");
    var cvvC = 0;
    var aux = 0;
    const [compra, setCompra] = useState({ id: 2, fecha: "a", hora: "a", iva: .16, descuento: 0, monto: "a", metodo: "a", descripcion: "a" });
    const [videojuego, setVideojuego] = useState({ id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] });
    const [tarjeta, setTarjeta] = useState({ saldo: 0.0, tipo: "", pan: "", fechaCaducidad: "", cvv: 0, titular: "" });

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
            const { saldo, tipo, pan, fechaCaducidad, cvv, titular } = data.Tarjetas[0];
            setTarjeta({ saldo, tipo, pan, fechaCaducidad, cvv, titular });
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCompras = async () => {
        try {
            const data = await (await CompraServer.getAllCompras()).json();
            aux = 0;
            data.Compras.forEach(compra => {
                aux++;
            });
            addCompraVideojuego(aux)
            addUsuarioCompra(aux)

        } catch (error) {
            console.log(error);
        }
    };

    const procesarCompra = async () => {
        if (cvvC == tarjeta.cvv) {
            try {
                compra.fecha = moment().format('L');
                compra.hora = moment().format('LT');
                compra.metodo = cookies.get("metodo")
                compra.monto = videojuego.precio.valor + videojuego.precio.simbolo;
                compra.descripcion = videojuego.nombre;
                const data = await (await CompraServer.addCompra(compra)).json();
                getAllCompras()
                cookies.cookies.set("idCompra",aux,{ path: "/confirmaPago" });
            } catch (error) {
                console.log(error);
            }
        } else (
            window.alert("CVV incorrecto")
        )
    };

    const addCompraVideojuego = async (idCompra) => {
        try {
            const dataCV = await (await CompraVideojuegoServer.addCompraVideojuego(idCompra, idVideojuego)).json();
        } catch (error) {
            console.log(error);
        }
    };

    const addUsuarioCompra = async (idCompra) => {
        try {
            const dataUC = await (await UsuarioCompraServer.addUsuarioCompra(idCompra, idUsuario)).json();
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        cvvC = e.target.value;
    }

    useEffect(() => {
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
                        <button className="btn" id={style.a} onClick={procesarCompra}>Confirmar</button>
                    </div>
                </div>
            </div>
        </>
    );

}
export default memo(CompraItem)