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

export const addCatalogoFiltro = async (catalogoFiltro) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idCatalogo": String(catalogoFiltro.idCatalogo),
            "idFiltro": String(catalogoFiltro.idFiltro)
        })
    });
};

export const deleteCatalogoFiltro = async (catalogoFiltro) => {
    return await fetch(`${API_URL}${catalogoFiltro.idCatalogo}/${catalogoFiltro.idFiltro}`, {
        method: "DELETE"
    });
};