import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as VideojuegoServer from './VideojuegoServer';

const VideojuegoForm = () => {
    const history = useNavigate();
    const params = useParams();

    const initialState = {id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: 0.0, genero: "", plataforma: "", datosExtra: "", calificacion: 0.0};
    const [videojuego, setVideojuego] = useState(initialState);

    const handleInputChange = (e) => {
        setVideojuego({ ...videojuego, [e.target.name]: e.target.value });
    };

    const getVideojuego = async (idVideojuego) => {
        try{
            const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
            const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion } = data.Videojuegos[0];

            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion });
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        if(params.id) getVideojuego(params.id);
        // eslint-disable-next-line
    }, []);

    return(
        <>
        <div>
            <img src={videojuego.caratula} alt="caratula"></img>

            <div>
                <h2>Datos Extra</h2>
                <p>{videojuego.datosExtra}</p>
                <button>Ver más</button>
            </div>
        </div>

        <div>
            <h1>{videojuego.nombre}</h1>

            <div>
                <h2>Descripción</h2>
                <p>{videojuego.descripcion}</p>
            </div>

            <iframe width="560" height="315" src={videojuego.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen="true" allowTransparency="true"></iframe>
        </div>

        <div>
            <h2>{videojuego.precio}</h2>


            <button onClick={() => history(`/pago/videojuego/${videojuego.id}`)}>Comprar</button>
            <button>Reservar</button>
            <button>Calificar</button>
            <button>Opinar</button>
        </div></>
    );
};

export default VideojuegoForm;