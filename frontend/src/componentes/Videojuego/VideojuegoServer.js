const API_URL = "http://localhost:8000/firebase/videojuegos/";

export const getAllVideojuegos = async () => {
    return await fetch(API_URL);
};

export const getVideojuegosByIdVideojuegos = async (idVideojuegos) => {
    return await fetch(`${API_URL}${idVideojuegos}`);
};

export const getVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}${idVideojuego}`);
};

export const updateVideojuego = async (videojuego) => {
    return await fetch(`${API_URL}${videojuego.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(videojuego.id),
            "nombre": String(videojuego.nombre),
            "descripcion": String(videojuego.descripcion),
            "caratula": String(videojuego.caratula),
            "video": String(videojuego.video),
            "precio": videojuego.precio,
            "genero": String(videojuego.genero),
            "plataforma": String(videojuego.plataforma),
            "datosExtra": String(videojuego.datosExtra),
            "calificacion": String(videojuego.calificacion),
            "capturas": videojuego.capturas
        })
    });
};