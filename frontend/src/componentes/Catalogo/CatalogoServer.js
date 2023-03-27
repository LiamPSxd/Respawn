const API_URL = "http://127.0.0.1:8000/firebase/videojuegos/";

export const getAllVideojuego = async () => {
    return await fetch(API_URL);
};

export const getVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}${idVideojuego}`);
};

export const addVideojuego = async (videojuegos) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(videojuegos.id),
            "nombre": String(videojuegos.nombre).trim(),
            "descripcion": String(videojuegos.descripcion).trim(),
            "caratula": String(videojuegos.caratula),
            "simbolo": String(divisa.simbolo).trim()
        })
    });
};

export const updateDivisa = async (divisa) => {
    return await fetch(`${API_URL}${divisa.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(divisa.id),
            "nombre": String(divisa.nombre).trim(),
            "pais": String(divisa.pais).trim(),
            "valor": String(divisa.valor),
            "simbolo": String(divisa.simbolo).trim()
        })
    });
};

export const deleteVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}${idVideojuego}`, {
        method: "DELETE"
    });
};