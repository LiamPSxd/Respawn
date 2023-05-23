import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import * as CuponServer from "../Cupon/CuponServer";
import * as UsuarioCuponServer from "../Usuario/Relacion/UsuarioCuponServer";
import Cookies from "universal-cookie";
import style from "./Pago.module.css";
import PagoCuponLista from "./PagoCuponLista";
import Mensaje from "../Mensaje/Mensaje";

const Pago = () => {
    const history = useNavigate();
    const cookies = new Cookies();

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [showMensaje, setShowMensaje] = useState(false);

    const [videojuego, setVideojuego] = useState({ id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0, capturas: [] });
    const [cupones, setCupones] = useState([]);
    const [usuarioCupones, setUsuarioCupones] = useState([]);

    const mostrarMensaje = (title, content) => {
        setTitulo(title);
        setContenido(content);
        setShowMensaje(!showMensaje);
    };

    const listaCupones = async () => {
        try {
            const data = await (await CuponServer.getCupones()).json();
            setCupones(data.Cupones);

            await getCantidad();
        } catch (error) {
            console.log(error);
        }
    };

    const getCantidad = async () => {
        const dataUsuarioCupon = await (await UsuarioCuponServer.getUsuarioCuponByIdUsuario(cookies.get("id"))).json();

        if (dataUsuarioCupon.message === "Exitoso")
            setUsuarioCupones(dataUsuarioCupon.UsuarioCupones);
    };

    const getVideojuego = async () => {
        try {
            const data = await (await VideojuegoServer.getVideojuego(cookies.get("videojuegoId"))).json();

            if(data.message === "Exitoso"){
                const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas } = data.Videojuegos[0];
            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas });
            }else mostrarMensaje("Error", "Se perdió la conexión con la Base de Datos. Por favor, intente más tarde");
        } catch (error) {
            console.log(error);
        }
    };

    const calcIva = () => parseFloat(parseFloat(videojuego.precio.valor) * 0.16).toFixed(2);

    const calcIvaCompleto = () => `${calcIva()} ${videojuego.precio.simbolo}`;

    const calcTotal = () => parseFloat(parseFloat(videojuego.precio.valor) + parseFloat(calcIva())).toFixed(2);

    const calcTotalCompleto = () => `${calcTotal()} ${videojuego.precio.simbolo}`;

    useEffect(() => {
        listaCupones();
        getVideojuego();
        // eslint-disable-next-line
    }, []);

    return (
        <><div className={style.container}>
            <div className={style.containerImg}>
                <img src={videojuego.caratula} alt="caratula" className={style.img}></img>
            </div>

            <div className={style.containerContent}>
                <h1><strong>{videojuego.nombre}</strong></h1>

                <div className="containerCosts">
                    <h3 className="header3">Precio</h3>
                    <p><strong>{`${videojuego.precio.valor} ${videojuego.precio.simbolo}`}</strong></p>
                    <h3 className="iva">IVA</h3>
                    <p><strong>{calcIvaCompleto()}</strong></p>
                    <h3>Total</h3>
                    <p><strong id="pTotal">{calcTotalCompleto()}</strong></p>
                </div>

                <p>Seleccione un método de pago</p>

                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button type="button" className="btn" id={style.btn} onClick={() => history(`/pago/tarjeta`)}>Tarjeta</button>
                    <button type="button" className="btn" id={style.btn} onClick={() => history(`/pago/paypal`)}>PayPal</button>
                </div>
            </div>

            <div>
                <h4><strong>Cupones Disponibles</strong></h4>

                <div id="cupones">
                    <PagoCuponLista cupones={cupones} cantidades={usuarioCupones} precio={videojuego.precio} />
                </div>

                <Link to="/cupones" id={style.link}>Ver más información</Link>
            </div>
        </div>
        
        <Mensaje show={showMensaje} close={mostrarMensaje} title={titulo} status={false}>{contenido}</Mensaje></>
    );
};

export default Pago;