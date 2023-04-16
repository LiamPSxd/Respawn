import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import * as VideojuegoServer from './VideojuegoServer';
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import ModalCalificacion from "../Modal/ModalCalificacion";

const VideojuegoForm = () => {
    const params = useParams();

    const initialState = { id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: 0.0, genero: "", plataforma: "", datosExtra: "", calificacion: 0.0, capturas: [] };
    const [videojuego, setVideojuego] = useState(initialState);

    // const handleInputChange = (e) => {
    //     setVideojuego({ ...videojuego, [e.target.name]: e.target.value });
    // };

    const getVideojuego = async (idVideojuego) => {
        try {
            const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
            const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas } = data.Videojuegos[0];
            console.log(capturas);
            console.log(capturas)
            // const x= [capturas.split(",")]
            // console.log(x)
            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion, capturas });
            console.log(videojuego)

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
            <div class="product-content product-wrap clearfix product-deatil" style={{
                borderBottom: "1px solid #dfe5e9",
                paddingBottom: "17px",
                paddingLeft: "16px",
                paddingTop: "16px",
                position: "relative"
            }}>
                <div class="row">
                    <div class="col-md-5 col-sm-12 col-xs-12">
                        <div class="product-image">
                            <div
                                style={{
                                    marginTop: "10%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    width: "250ph",
                                    height: "50%"

                                }}>

                                <MDBCarousel showControls showIndicators>

                                    <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={1}
                                        src={videojuego.caratula}
                                        alt='Carátula'
                                        height='450px'
                                    />
                                    <MDBCarouselItem

                                    className='w-100 d-block'
                                        itemId={2}
                                        src={videojuego.capturas[0]}
                                        alt='...'
                                    
                                    />

                                    <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={3}
                                        src={videojuego.capturas[1]}
                                        alt='...'
                                    />
                                       <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={4}
                                        src={videojuego.capturas[2]}
                                        alt='...'
                                    />

                                    <MDBCarouselItem
                                        className='w-100 d-block'
                                        itemId={5}
                                        src={videojuego.capturas[3]}
                                        alt='...'
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
                        <div class="certified" style={{ margin: "10px" }}>
                            <ul style={{ paddingLeft: "0" }}>
                                <li style={
                                    {
                                        marginLeft: "-3",
                                        display: "inline-block",
                                        backgroundColor: "#f9f9f9",
                                        border: "1px solid #ccc",
                                        padding: "13px 19px"
                                    }}>
                                    <a href="javascript:void(0);">Delivery time<span style={{
                                        display: "block",
                                        color: "#21c2f8",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        textAlign: "center"
                                    }}>7 Working Days</span></a>
                                </li>
                                <li style={
                                    {
                                        borderRight: "none",
                                        marginLeft: "-3",
                                        display: "inline-block",
                                        backgroundColor: "#f9f9f9",
                                        border: "1px solid #ccc",
                                        padding: "13px 19px"
                                    }}>
                                    <a href="javascript:void(0);" style={{
                                        textAlign: "left",
                                        fontSize: "12px",
                                        color: "#6d7a83",
                                        lineHeight: "16px",
                                        textDecoration: "none"
                                    }}>Certified<span style={{
                                        display: "block",
                                        color: "#21c2f8",
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        textAlign: "center"
                                    }}>Quality Assured</span></a>
                                </li>
                            </ul>
                        </div>
                        <hr />
                        <div class="description description-tabs" style={{
                            padding: "30px 0 5px !important"
                        }}>
                            <ModalCalificacion/>
                            <ul id="myTab" class="nav nav-pills">
                                <li className="active"><a href="#more-information" data-toggle="tab" class="no-margin">Product
                                    Description </a></li>
                                <li class=""><a href="#specifications" data-toggle="tab">Specifications</a></li>
                                <li class=""><a href="#reviews" data-toggle="tab">Reviews</a></li>
                            </ul>
                            <div id="myTabContent" class="tab-content" style={{
                                padding: "10px 0"
                            }}>
                                <div class="tab-pane fade active in" id="more-information">
                                    <br />
                                    <strong>Description Title</strong>
                                    <p>
                                        Integer egestas, orci id condimentum eleifend, nibh nisi pulvinar eros, vitae ornare
                                        massa neque ut orci. Nam aliquet lectus sed odio eleifend, at iaculis dolor egestas.
                                        Nunc elementum pellentesque augue
                                        sodales porta. Etiam aliquet rutrum turpis, feugiat sodales ipsum consectetur nec.
                                    </p>
                                </div>
                                <div class="tab-pane fade" id="specifications">
                                    <br />
                                    <dl class="">
                                        <dt>Gravina</dt>
                                        <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
                                        <dd>Donec id elit non mi porta gravida at eget metus.</dd>
                                        <dd>Eget lacinia odio sem nec elit.</dd>
                                        <br />
                                        <dt>Test lists</dt>
                                        <dd>A description list is perfect for defining terms.</dd>
                                        <br />
                                        <dt>Altra porta</dt>
                                        <dd>Vestibulum id ligula porta felis euismod semper</dd>
                                    </dl>
                                </div>
                                <div class="tab-pane fade" id="reviews">
                                    <br />
                                    <form method="post" class="well padding-bottom-10" onsubmit="return false;">
                                        <textarea rows="2" class="form-control" placeholder="Write a review"></textarea>
                                        <div class="margin-top-10">
                                            <button type="submit" class="btn btn-sm btn-primary pull-right">
                                                Submit Review
                                            </button>
                                            <a href="javascript:void(0);" class="btn btn-link profile-link-btn"
                                                rel="tooltip" data-placement="bottom" title=""
                                                data-original-title="Add Location"><i class="fa fa-location-arrow"></i></a>
                                            <a href="javascript:void(0);" class="btn btn-link profile-link-btn"
                                                rel="tooltip" data-placement="bottom" title=""
                                                data-original-title="Add Voice"><i class="fa fa-microphone"></i></a>
                                            <a href="javascript:void(0);" class="btn btn-link profile-link-btn"
                                                rel="tooltip" data-placement="bottom" title=""
                                                data-original-title="Add Photo"><i class="fa fa-camera"></i></a>
                                            <a href="javascript:void(0);" class="btn btn-link profile-link-btn"
                                                rel="tooltip" data-placement="bottom" title=""
                                                data-original-title="Add File"><i class="fa fa-file"></i></a>
                                        </div>
                                    </form>
                                    <div class="chat-body no-padding profile-message">
                                        <ul>
                                            <li class="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                    class="online" />
                                                <span class="message-text" style={{ width: "calc(100% - 70px)" }}>
                                                    <a href="javascript:void(0);" class="username">
                                                        Alisha Molly
                                                        <span class="badge">Purchase Verified</span>
                                                        <span class="pull-right">
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-muted"></i>
                                                        </span>
                                                    </a>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>
                                                <ul class="list-inline font-xs">
                                                    <li>
                                                        <a href="javascript:void(0);" class="text-info"><i
                                                            class="fa fa-thumbs-up"></i> This was helpful (22)</a>
                                                    </li>
                                                    <li class="pull-right">
                                                        <small class="text-muted pull-right ultra-light"> Posted 1 year ago
                                                        </small>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                    class="online" />
                                                <span class="message-text">
                                                    <a href="javascript:void(0);" class="username">
                                                        Aragon Zarko
                                                        <span class="badge">Purchase Verified</span>
                                                        <span class="pull-right">
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                            <i class="fa fa-star fa-2x text-primary"></i>
                                                        </span>
                                                    </a>
                                                    Excellent product, love it!
                                                </span>
                                                <ul class="list-inline font-xs">
                                                    <li>
                                                        <a href="javascript:void(0);" class="text-info"><i
                                                            class="fa fa-thumbs-up"></i> This was helpful (22)</a>
                                                    </li>
                                                    <li class="pull-right">
                                                        <small class="text-muted pull-right ultra-light"> Posted 1 year ago
                                                        </small>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-6">
                                <a href="javascript:void(0);" class="btn btn-success btn-lg">Add to cart (${videojuego.precio})</a>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-6">
                                <div class="btn-group pull-right">
                                    <button class="btn btn-white btn-default"><i class="fa fa-star"></i> Add to
                                        wishlist</button>
                                    <button class="btn btn-white btn-default"><i class="fa fa-envelope"></i> Contact
                                        Seller</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</>
            );
};

            export default VideojuegoForm;