const API_URL = "http://127.0.0.1:8000/firebase/usuariosCompras/";

export const getAllUsuarioCompras = async () => {
    return await fetch(API_URL);
};

export const getUsuarioCompraByIdUsuario = async (idUsuario) => {
    return await fetch(`${API_URL}${idUsuario}`);
};

export const getUsuarioCompraByIdCompra = async (idCompra) => {
    return await fetch(`${API_URL}/${idCompra}`);
};

export const getUsuarioCompra = async (usuarioCompra) => {
    return await fetch(`${API_URL}${usuarioCompra.idUsuario}/${usuarioCompra.idCompra}`);
};

export const addUsuarioCompra = async (usuarioCompra) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idUsuario": String(usuarioCompra.idUsuario).trim(),
            "idCompra": String(usuarioCompra.idCompra).trim()
        })
    });
};