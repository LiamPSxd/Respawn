import React from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import styles from './Ticket.module.css'
import * as CompraServer from "../Compra/CompraServer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
    const history = useNavigate();
    const cookies = new Cookies();
    var idUsuario = cookies.get("id");
    var idVideojuego = cookies.get("videojuegoId");
    const [compra, setCompra] = useState({ id: 0, fecha: "", hora: "", iva: .16, descuento: 0, monto: "", metodo: "", descripcion: "", idUsuario: 0, idVideojuego: 0 });

    const getAllCompras = async () => {
        try {
            const data = await (await CompraServer.getAllCompras()).json();
            data.Compras.forEach(compra => {
                if (compra.idUsuario === idUsuario && compra.idVideojuego === idVideojuego) {
                    const { id, fecha, hora, iva, descuento, monto, metodo, descripcion, idUsuario, idVideojuego } = compra;
                    setCompra({ id, fecha, hora, iva, descuento, monto, metodo, descripcion, idUsuario, idVideojuego });
                }
            });
        } catch (error) {
            window.alert("No se puede generar un ticket ahora mismo")
        }
    };


    useEffect(() => {
        getAllCompras();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.general}>
            <div className={styles.register}>
                <div className={styles.ticket}>
                    <h1>¡Gracias por tu compra!</h1>
                    <h6 style={{ color: "black" }}>{compra.fecha} {compra.hora}</h6>
                    <table>
                        <tbody className={styles.entry}>
                            <tr>
                                <th>{compra.descripcion}</th>
                                <th className={styles.total}>${compra.monto}</th>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th className={styles.total}>${compra.monto}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <h6 style={{ color: "white", marginTop: "30px" }}>Guarda tus datos, serán importantes para solicitar un reembolso</h6>
                <button className="btn" id={styles.btn} onClick={() => history("/catalogo")}> Volver al catálogo</button>
            </div>
        </div>
    );
};

export default Ticket;