const API_URL = "http://127.0.0.1:8000/firebase/videojuegoOfertas/";

export const getAllVideojuegoOfertas = async () => {
    return await fetch(API_URL);
};

export const getVideojuegoOfertaByIdOferta = async (idOferta) => {
    return await fetch(`${API_URL}${idOferta}`);
};

export const getVideojuegoOfertaByIdVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}/${idVideojuego}`);
};

export const getVideojuegoOferta = async (videojuegoOferta) => {
    return await fetch(`${API_URL}${videojuegoOferta.idVideojuego}/${videojuegoOferta.idOferta}`);
};