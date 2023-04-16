const API_URL = "http://127.0.0.1:8000/firebase/filtros/";

export const getAllFiltros = async () => {
    return await fetch(API_URL);
};

export const getFiltro = async (idFiltro) => {
    return await fetch(`${API_URL}${idFiltro}`);
};

export const addFiltro = async (filtro) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(filtro.id),
            "nombre": String(filtro.nombre),
        })
    });
};

export const updateFiltro = async (filtro) => {
    return await fetch(`${API_URL}${filtro.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(filtro.id),
            "nombre": String(filtro.nombre),
        })
    });
};

export const deleteFiltro = async (idFiltro) => {
    return await fetch(`${API_URL}${idFiltro}`, {
        method: "DELETE"
    });
};