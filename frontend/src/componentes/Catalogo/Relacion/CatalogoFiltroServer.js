const API_URL = "http://127.0.0.1:8000/firebase/catalogoFiltros/";

export const getAllCatalogoFiltros = async () => {
    return await fetch(API_URL);
};

export const getCatalogoFiltrosByIdCatalogo = async (idCatalogo) => {
    return await fetch(`${API_URL}${idCatalogo}`);
};

export const getCatalogoFiltrosByIdFiltro = async (idFiltro) => {
    return await fetch(`${API_URL}/${idFiltro}`);
};

export const getCatalogoFiltro = async (catalogoFiltro) => {
    return await fetch(`${API_URL}${catalogoFiltro.idCatalogo}/${catalogoFiltro.idFiltro}`);
};