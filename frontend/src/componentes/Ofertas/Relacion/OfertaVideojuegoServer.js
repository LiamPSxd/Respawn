const API_URL = "http://127.0.0.1:8000/firebase/videojuegoOfertas/";

export const getAllOfertaVideojuegos = async () => {
    return await fetch(API_URL);
};
export const getOfertaVideojuegosByIdOferta = async (idOferta) => {
    return await fetch(`${API_URL}${idOferta}`);
};

export const getOfertaVideojuegosByIdVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}/${idVideojuego}`);
};

export const getOfertaVideojuego = async (ofertaVideojuego) => {
    return await fetch(`${API_URL}${ofertaVideojuego.idOferta}/${ofertaVideojuego.idVideojuego}`);
};

export const addOfertaVideojuego = async (ofertaVideojuego) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idOferta": String(ofertaVideojuego.idOferta),
            "idVideojuego": String(ofertaVideojuego.idVideojuego)
        })
    });
};

export const deleteOfertaVideojuego = async (ofertaVideojuego) => {
    return await fetch(`${API_URL}${ofertaVideojuego.idOferta}/${ofertaVideojuego.idVideojuego}`, {
        method: "DELETE"
    });
};
