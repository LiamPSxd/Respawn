const API_URL = "http://127.0.0.1:8000/firebase/catalogoVideojuegos/";

export const getAllCatalogoVideojuegos = async () => {
    return await fetch(API_URL);
};

export const getCatalogoVideojuegosByIdCatalogo = async (idCatalogo) => {
    return await fetch(`${API_URL}${idCatalogo}`);
};

export const getCatalogoVideojuegosByIdVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}/${idVideojuego}`);
};

export const getCatalogoVideojuego = async (catalogoVideojuego) => {
    return await fetch(`${API_URL}${catalogoVideojuego.idCatalogo}/${catalogoVideojuego.idVideojuego}`);
};

export const addCatalogoVideojuego = async (catalogoVideojuego) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idCatalogo": String(catalogoVideojuego.idCatalogo),
            "idVideojuego": String(catalogoVideojuego.idVideojuego)
        })
    });
};

export const deleteCatalogoVideojuego = async (catalogoVideojuego) => {
    return await fetch(`${API_URL}${catalogoVideojuego.idCatalogo}/${catalogoVideojuego.idVideojuego}`, {
        method: "DELETE"
    });
};