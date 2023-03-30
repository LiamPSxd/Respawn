import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as VideojuegoServer from './VideojuegoServer';

const VideojuegoForm = ({}) => {
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
        // HTML de la pantalla de un Videojuego.
        
            <label> Juego {videojuego.nombre}</label>
        
    );
};

export default VideojuegoForm;