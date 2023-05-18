const API_URL = "http://127.0.0.1:8000/firebase/videojuegoCompras/";

export const getAllCompraVideojuegos = async () => {
    return await fetch(API_URL);
};

export const getCompraVideojuegoByIdCompra = async (idCompra) => {
    return await fetch(`${API_URL}${idCompra}`);
};

export const getCompraVideojuegoByIdVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}/${idVideojuego}`);
};

export const getCompraVideojuego = async (idCompra, idVideojuego) => {
    return await fetch(`${API_URL}${idCompra}/${idVideojuego}`);
};

export const addCompraVideojuego = async (idCompra, idVideojuego) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idCompra": String(idCompra).trim(),
            "idVideojuego": String(idVideojuego).trim()
        })
    });
};

export const deleteCompraVideojuego = async (idCompra, idVideojuego) => {
    return await fetch(`${API_URL}${idCompra}/${idVideojuego}`, {
        method: "DELETE"
    });
};