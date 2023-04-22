import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as VideojuegoServer from './VideojuegoServer';
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import ModalCalificacion from "../Modal/ModalCalificacion";
import Comentario from "../Comentario/comentario";

const VideojuegoForm = () => {
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
        <>
            <div class="product-content product-wrap clearfix product-deatil" id="product-content">
                <div class="row">
                    <div class="col-md-5 col-sm-12 col-xs-12">
                        <div class="product-image" id="product-image">
                            <div>

                                <MDBCarousel showControls showIndicators fade >

                                    <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={1}
                                        src={videojuego.caratula}
                                        alt='Carátula'
                                        height='300vh'

                                    />
                                    <MDBCarouselItem

                                        className='w-100 d-block'
                                        itemId={2}
                                        src={videojuego.capturas[0]}
                                        alt='...'
                                        height='300vh'

                                    />

                                    <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={3}
                                        src={videojuego.capturas[1]}
                                        alt='...'
                                        height='300vh'
                                    />
                                    <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={4}
                                        src={videojuego.capturas[2]}
                                        alt='...'
                                        height='300vh'
                                    />

                                    <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={5}
                                        src={videojuego.capturas[3]}
                                        alt='...'
                                        height='300vh'
                                    />


                                </MDBCarousel>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6 col-md-offset-1 col-sm-12 col-xs-12" style={{
                        borderBottom: "1px solid #dfe5e9",
                        paddingBottom: "17px",
                        paddingLeft: "16px",
                        paddingTop: "16px",
                        position: "relative"
                    }}>

                        <div>

                        </div>
                        <h2 class="name">
                            {videojuego.nombre}
                        </h2>

                        <hr />
                        <h3 class="price-container" style={{
                            fontSize: "24px",
                            margin: "0",
                            fontWeight: "300"
                        }

                        }>
                            ${videojuego.precio}
                            <small style={{ fontSize: "12px" }}>*includes tax</small>

                        </h3>

                        <div class="certified" style={{
                            marginTop: "5%"
                        }}>

                            <div class="col-sm-12 col-md-6 col-lg-6" style={{
                                marginLeft: "10%",
                                marginRight: "10%",
                                marginTop: "1%",
                                alignContent: "center",
                            }}>
                                <a href="" class="btn btn-success btn-lg">Add to cart (${videojuego.precio})</a>
                            </div>

                            <div style={{
                                marginLeft: "10%",
                                marginRight: "10%",
                                marginTop: "1%",
                                alignContent: "center",
                            }}>
                                <div class="btn-group pull-right">
                                    <button class="btn btn-white btn-default"><i class="fa fa-star"></i> Add to
                                        wishlist</button>
                                    <span style={{
                                        marginLeft: "10%",
                                        marginRight: "10%",
                                    }}><ModalCalificacion /></span>
                                </div>
                            </div>
                        </div>
                        <hr />
                       
                            <span style={{Align:"center"}}><iframe width="100%" height="80%" align="center" src={videojuego.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen={true} allowtransparency="true"></iframe></span>
                        
                        <hr />

                    </div>
                </div>

            </div>

            <div class="comentarios Alan" style={{
                padding: "30px 0 5px !important",
                marginLeft: "10%",
                marginRight: "10%",
                marginTop: "1%"
            }}>
                {/*----------------- NO MOVER IMPORTANTE ------------------------------*/}
                <div id="disqus_thread"></div>
                    <Comentario />
                {/*--------------  NO TOCAR SI NO ME SACAN DEL EQUIPO -------------------- */}
            </div>
        </>
    );
};

export default VideojuegoForm;