import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as VideojuegoServer from './VideojuegoServer';
import { MDBCarousel } from "mdb-react-ui-kit";
import VideojuegoBanner from "./VideojuegoBanner";
import ModalCalificacion from "../Modal/ModalCalificacion";
import Comentario from "../Comentario/comentario";
import './VideojuegoForm.css';

const VideojuegoForm = () => {

    const [collapse, setCollapse] = useState(false);
    const params = useParams();

    const initialState = { id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: [], genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] };
    const [videojuego, setVideojuego] = useState(initialState);

    // const handleInputChange = (e) => {
    //     setVideojuego({ ...videojuego, [e.target.name]: e.target.value });
    // };

    const getVideojuego = async (idVideojuego) => {
        try {
            const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
            const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas } = data.Videojuegos[0];
            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) getVideojuego(params.id);
        // eslint-disable-next-line
    }, []);


    return (
        <><div className="product-content product-wrap clearfix product-deatil" id="product-content">
            <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                    <div className="product-image" id="product-image">
                        <div>
                            {Object.keys(videojuego.capturas).filter(k => String(k) === "0")
                                .map(k => (
                                    <MDBCarousel key={videojuego.capturas[k]} showControls showIndicators fade>
                                        <VideojuegoBanner key={k + 1} id={k} caratula={videojuego.caratula} />

                                        {videojuego.capturas.map((captura, id) => (
                                            <VideojuegoBanner key={id + 2} id={id + 1} caratula={videojuego.caratula} captura={captura} />
                                        ))}
                                    </MDBCarousel>
                                ))}
                        </div>
                    </div>
                    <div id="video">
                        <span><iframe width="100%" height="80%" align="center" src={videojuego.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen={true} allowtransparency="true"></iframe></span>
                    </div>
                </div>

                <div id="div_general" className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                    <h2 className="name">
                        {videojuego.nombre}
                    </h2>
                    <hr />
                    <h3 id="price_container">
                        ${videojuego.precio.valor}
                        <small style={{ fontSize: "12px" }}>*includes tax</small>
                    </h3>
                    <div className="col-sm-12 col-md-6 col-lg-6" id="contenedor_botones">
                        <a href="carrito" className="btn btn-success btn-lg">Add to cart (${videojuego.precio.valor})</a>
                    </div>
                    <div id="contenedor_botones">
                        <div className="btn-group pull-right">
                            <button className="btn btn-white btn-default"><i className="fa fa-star"></i> Add to
                                wishlist</button>
                            <span id="estilos_Modal"><ModalCalificacion videojuego={videojuego} /></span>
                            <h6>{videojuego.calificacion}</h6>
                        </div>
                    </div>
                    <hr />
                    <div id="descripcion">
                        <div className={`long-text ${collapse ? "expanded" : ""}`}>
                            <p align="center"><strong>Descripcion del producto:</strong></p>
                            <p align="justify">{videojuego.descripcion}</p>
                        </div>
                        <button onClick={() => setCollapse(prev => !prev)}>{collapse ? "Saber menos" : "Saber mas"}</button>
                    </div>

                </div>

            </div>
        </div>
            <div id="comentarios_Alan">
                {/*----------------- NO MOVER IMPORTANTE ------------------------------*/}
                <Comentario />
                {/*--------------  NO TOCAR SI NO ME SACAN DEL EQUIPO -------------------- */}
            </div>
            </>
    );
};

export default VideojuegoForm;