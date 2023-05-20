import React, { useEffect, useState } from "react";
import { memo } from "react";
import style from "./Reembolso.module.css";
import Cookies from "universal-cookie";
import * as CompraServer from "../Compra/CompraServer";
import moment from "moment";

const Reembolso = () => {
    const cookies = new Cookies();
    var idVideojuego = cookies.get("videojuegoId");
    var idUsuario = cookies.get("id");
    const [compra, setCompra] = useState({ id: 0, fecha: "", hora: "", iva: .16, descuento: 0, monto: "", metodo: "", descripcion: "", idUsuario: 0, idVideojuego: 0 });

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

    const solicitaReembolso = async () => {
        var fecha= moment(document.getElementById("fecha").value).format('L');
        var hora= moment(document.getElementById("hora").value,"hhmm").format('LT');

        if(compra.hora===hora&&compra.fecha===fecha){
            try {
                const data = await (await CompraServer.deleteCompra(compra.id)).json();
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }else{
            window.alert("Datos no coincidentes")
        }
    }

    useEffect(() => {
        getAllCompras()
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className={style.html2}>
                <div className={style.compraBox}>
                    <h2>Solicitar reembolso</h2>
                    <h6>Ingresa todos los datos correctos para solicitar un reembolso</h6>
                    <div className={style.userBox}>
                        <label className={style.label}>Fecha de compra</label>
                        <input className={style.input} id="fecha" type="date" />
                        <label className={style.label}>Hora de compra</label>
                        <input className={style.input} id="hora" type="time" />
                        <label className={style.label}>Método de pago</label>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button className={style.a} id="btnConfirmar" onClick={solicitaReembolso} >Confirmar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Reembolso);
