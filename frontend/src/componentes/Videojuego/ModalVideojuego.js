import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDom from "react-dom";
import style from "../Mensaje/Mensaje.module.scss";
import buttonClose from "../Mensaje/media/close.svg";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import Mensaje from "../Mensaje/Mensaje";

const ModalVideojuego = ({ show, close }) => {
    const history = useNavigate();

    const [videojuego, setVideojuego] = useState([]);
    const [fontSize, setFontSize] = useState(0);

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [showMensaje, setShowMensaje] = useState(false);

    const mostrarMensaje = (title, content) => {
        setTitulo(title);
        setContenido(content);
        setShowMensaje(!showMensaje);
    };

    const handleTitulo = (nombre) => {
        const titulo = nombre.length;

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
                break;
        }
    };

    const getCantidadVideojuegos = async () => {
        const cant = await (await VideojuegoServer.getVideojuegosCantidad()).json();
        return cant.Videojuegos[0].cantidad;
    };

    const getNumberRandom = async () => Math.floor(Math.random() * await getCantidadVideojuegos());

    const getVideojuegoAleatorio = async () => {
        try{
            const data = await (await VideojuegoServer.getVideojuego(await getNumberRandom())).json();

            if(data.message === "Exitoso"){
                await setVideojuego(data.Videojuegos[0]);
                handleTitulo(data.Videojuegos[0].nombre);
            }else mostrarMensaje("Error", "Se perdió la conexión con la Base de Datos. Por favor, intente más tarde");
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getVideojuegoAleatorio();
        // eslint-disable-next-line
    }, []);

    return ReactDom.createPortal(
        <><div className={`${style.modalContainer} ${show ? style.show : ""}`} onClick={() => close()}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <header className={style.modalHeader}>
                    <h1 className={style.modalHeaderTitle} style={{fontSize: `${fontSize}em`}}>{videojuego.nombre}</h1>
                    <button className={style.close} onClick={() => close()}>
                        <img src={buttonClose} alt="close" />
                    </button>
                </header>

                <main className={style.modalContent}>
                    <img className={style.imagen} src={videojuego.caratula} alt="close" />
                </main>

                <footer className={style.modalFooter}>
                    <button className={style.modalDetalles} onClick={() => history(`/videojuego/${videojuego.id}`)}>Ver detalles</button>
                    <button className={style.modalCerrar} onClick={() => close()}>No me interesa</button>
                </footer>
            </div>
        </div>

        <Mensaje show={showMensaje} close={mostrarMensaje} title={titulo} status={false}>{contenido}</Mensaje></>,
        document.getElementById("mensaje")
    );
};

export default ModalVideojuego;