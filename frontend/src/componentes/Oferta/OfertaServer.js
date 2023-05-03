const API_URL = "http://127.0.0.1:8000/firebase/ofertas/";

export const getAllOfertas = async () => {
    return await fetch(API_URL);
};

export const getOferta = async (idOferta) => {
    return await fetch(`${API_URL}${idOferta}`);
};