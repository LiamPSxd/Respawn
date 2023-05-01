import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideojuegoBanner from "./VideojuegoBanner";
import ModalCalificacion from "../Modal/ModalCalificacion";
import * as VideojuegoServer from "./VideojuegoServer";
import { MDBCarousel } from "mdb-react-ui-kit";
import style from "./Videojuego.module.css";

const VideojuegoDetail = () => {
    const history = useNavigate();
    const params = useParams();

    const [collapse, setCollapse] = useState(false);

    const initialState = { id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] };
    const [videojuego, setVideojuego] = useState(initialState);

    const getVideojuego = async (idVideojuego) => {
        try{
            const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
            const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas } = data.Videojuegos[0];
            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas });
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        if(params.id) getVideojuego(params.id);
        // eslint-disable-next-line
    }, []);

    return(
        <><div className="product-content product-wrap clearfix product-deatil" id="product-content">
            <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                    <div className="product-image" id="product-image">
                        <div>
                            {Object.keys(videojuego.capturas).filter(k => String(k) === "0")
                            .map(k => (
                                <MDBCarousel key={videojuego.capturas[k]} showControls showIndicators fade>
                                    <VideojuegoBanner key={k+1} id={k} caratula={videojuego.caratula} />

                                    {videojuego.capturas.map((captura, id) => (
                                        <VideojuegoBanner key={id+2} id={id+1} caratula={videojuego.caratula} captura={captura} />
                                    ))}
                                </MDBCarousel>
                            ))}
                        </div>
                    </div>

                    <div id={style.video}>
                        <span><iframe id={style.item} width="100%" height="80%" align="center" src={videojuego.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen={true} allowtransparency="true"></iframe></span>
                    </div>
                </div>

                <div id="div_general" className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                    <h1 className="name"><strong>{videojuego.nombre}</strong></h1>
                    <hr />

                    <h2 id="price_container">
                        {videojuego.precio.valor} {videojuego.precio.simbolo}
                        <small style={{ fontSize: "12px" }}><strong>*No incluye IVA</strong></small>
                    </h2>

                    <div className="col-sm-12 col-md-6 col-lg-6" id="contenedor_botones">
                        <button className="btn btn-success btn-lg" onClick={() => history("/carrito")}>Añadir al Carrito</button>

                        <div className="btn-group pull-right">
                            <button className="btn btn-white btn-default"><i className="fa fa-star"></i> Añadir a la WishList</button>
                            <span id="estilos_Modal">
                                <ModalCalificacion videojuego={videojuego} />
                            </span>
                            <h5>{videojuego.calificacion}</h5>
                        </div>
                    </div>
                    <hr />

                    <div id="descripcion">
                        <div className={`${style.longText} ${collapse ? style.expanded : ""}`}>
                            <p align="center"><strong>Descripcion del producto:</strong></p>
                            <p align="justify">
                                {videojuego.descripcion} <button className="btn transparent btn-light" onClick={() => setCollapse(prev => !prev)}>{collapse ? "Ver menos" : "Ver más"}</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div></>

        // <div id="comentarios_Alan">
        //     {/*----------------- NO MOVER IMPORTANTE ------------------------------*/}
        //     <div id="disqus_thread"></div>
        //     <Comentario />
        //     {/*--------------  NO TOCAR SI NO ME SACAN DEL EQUIPO -------------------- */}
        // </div>
    );
};

export default VideojuegoDetail;