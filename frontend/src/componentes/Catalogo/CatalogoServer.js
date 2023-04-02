const API_URL = "http://127.0.0.1:8000/firebase/catalogos/";

export const getAllCatalogos = async () => {
    return await fetch(API_URL);
};

export const getCatalogo = async (idCatalogo) => {
    return await fetch(`${API_URL}${idCatalogo}`);
};