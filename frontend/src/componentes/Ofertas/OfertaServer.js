const API_URL = "http://127.0.0.1:8000/firebase/ofertas/";

export const getAllOfertas = async () => {
    return await fetch(API_URL);
};

export const getOferta = async (idOferta) => {
    return await fetch(`${API_URL}${idOferta}`);
};

export const addOferta = async (oferta) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(oferta.id),
            "nombre": String(oferta.nombre),
            "descuento": int(oferta.descuento),
            "tiempo": String(oferta.tiempo),
        })
    });
};

export const updateOferta = async (oferta) => {
    return await fetch(`${API_URL}${oferta.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(oferta.id),
            "nombre": String(oferta.nombre),
            "descuento": int(oferta.descuento),
            "tiempo": String(oferta.tiempo),
        })
    });
};

export const deleteOferta = async (idOferta) => {
    return await fetch(`${API_URL}${idOferta}`, {
        method: "DELETE"
    });
};