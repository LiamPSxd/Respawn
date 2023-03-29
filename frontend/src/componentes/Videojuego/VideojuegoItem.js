import React from "react";
import { useNavigate } from "react-router-dom";

const VideojuegoItem = ({videojuego}) => {
    const history = useNavigate();

    return(
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <img className="card-img-top" src={videojuego.caratula} alt="caratula" />
                <h1 className="card-title"><strong>{videojuego.nombre}</strong></h1>
                <h4 className="card-text"><strong>Genero </strong>{videojuego.genero}</h4>
                <h4 className="card-text"><strong>Precio </strong>{videojuego.precio}</h4>
                <button className="btn btn-success my-2" onClick={() => history(`/videojuego/${videojuego.id}`)}><strong>Comprar</strong></button>
            </div>
        </div>
    );
};

export default VideojuegoItem;