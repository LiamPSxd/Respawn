import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideojuegoBanner from "./VideojuegoBanner";
import ModalCalificacion from "./ModalCalificacion";
import * as VideojuegoServer from "./VideojuegoServer";
import { MDBCarousel } from "mdb-react-ui-kit";
import style from "./Videojuego.module.css";
import Cookies from "universal-cookie";
import Mensaje from "../Mensaje/Mensaje";
import Comentario from "../Comentario/comentario";
import * as CompraServer from "../Compra/CompraServer";

const VideojuegoDetail = () => {
    const history = useNavigate();
    const params = useParams();
    const cookies = new Cookies();
    var idUsuario = cookies.get("id");

    const [ReadMore, setReadMore] = useState(false);
    const linkName = ReadMore ? 'Ver Menos <<' : 'Ver Mas >>'

    const [showMensaje, setShowMensaje] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [iniciarSesion, setIniciarSesion] = useState(false);

    const mostrarMensaje = (title, content, sesion) => {
        setTitulo(title);
        setContenido(content);
        setIniciarSesion(sesion);
        setShowMensaje(!showMensaje);
    };

    const initialState = { id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] };
    const [videojuego, setVideojuego] = useState(initialState);

    const getAllCompras = async (idVideojuego) => {
        try {
            const data = await (await CompraServer.getAllCompras()).json();
            data.Compras.forEach(compra => {
                if(compra.idUsuario===idUsuario && compra.idVideojuego===idVideojuego){
                    document.getElementById("btnCR").textContent= "Reembolsar $"
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

    const validarSesion = () => {
        if(document.getElementById("btnCR").textContent==="Comprar $"){
            if(cookies.get("id")){
                cookies.set("videojuegoId", `${videojuego.id}`, { path: "/" });
                history("/pago");
            } else mostrarMensaje("Advertencia", "Necesitas tener una cuenta para continuar, ¿Desea iniciar sesión ahora?", true);
        }else{
            cookies.set("videojuegoId", `${videojuego.id}`, { path: "/" });
            history("/reembolso");
        }
    };
    const extra = <p align="justify" id={style.extracontent}>{videojuego.datosExtra}</p>

    useEffect(() => {
        cookies.set("videojuegoId", `${videojuego.id}`, { path: "/" });
        if (params.id) getVideojuego(params.id);
        getAllCompras(params.id)
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="product-content product-wrap clearfix product-deatil" id="product-content">
                <div className="row" id={style.general}>
                    <div className="col-md-5 col-sm-12 col-xs-12">
                        <div className="product-image" id="product-image">
                            {Object.keys(videojuego.capturas).filter(k => String(k) === "0")
                                .map(k => (
                                    <MDBCarousel key={videojuego.capturas[k]} showControls showIndicators fade>
                                        <VideojuegoBanner key={k + 1} id={k} caratula={videojuego.caratula} />

                                        {videojuego.capturas.map((captura, id) => (
                                            <VideojuegoBanner key={id + 2} id={id + 1} caratula={videojuego.caratula} captura={captura} />
                                        ))}
                                    </MDBCarousel>
                                ))}
                            <span><iframe id={style.item} width="100%" height="80%" align="center" src={videojuego.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen={true} allowtransparency="true"></iframe></span>
                        </div>
                    </div>

                    <div id="div_general" className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                        <h1 className="name"><strong>{videojuego.nombre}</strong></h1>
                        <h5>Calificacion: <strong>{videojuego.calificacion} ★</strong></h5>
                        <hr id={style.hr} />

                        <div id={style.divBotones}>
                            <p id="price_container">
                                {videojuego.precio.valor} {videojuego.precio.simbolo}
                            </p>
                            
                            <button className={style.btn} id="btnCR" onClick={() => validarSesion()}>Comprar $</button>
                            

                            {cookies.get("id") ? (
                                <><button className={style.btn}> WishList ❤</button>
                                <ModalCalificacion videojuego={videojuego} /></>
                            ) : null}
                        </div>

                        <hr id={style.hr} />

                        <div id="descripcion">
                            <div>
                                <p align="center"><strong>Descripcion del producto:</strong></p>
                                <p align="justify">
                                    {videojuego.descripcion} <button className="btn transparent btn-light" onClick={() => { setReadMore(!ReadMore) }}>{linkName}</button>
                                    {ReadMore && extra}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Mensaje show={showMensaje} close={mostrarMensaje} title={titulo} status={iniciarSesion}>{contenido}</Mensaje>

            <div id="comentarios_Alan">
                <Comentario />
            </div>
        </>
    );
};

export default memo(VideojuegoDetail);