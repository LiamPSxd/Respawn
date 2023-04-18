const API_URL = "http://127.0.0.1:8000/firebase/filtros/";

export const getAllFiltros = async () => {
    return await fetch(API_URL);
};

export const getFiltro = async (idFiltro) => {
    return await fetch(`${API_URL}${idFiltro}`);
};