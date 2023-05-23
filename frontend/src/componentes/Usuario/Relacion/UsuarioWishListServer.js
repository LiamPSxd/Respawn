const API_URL = "http://127.0.0.1:8000/firebase/usuariosWishLists/";

export const getAllUsuarioWishLists = async () => {
    return await fetch(API_URL);
};

export const getUsuarioWishListByIdUsuario = async (idUsuario) => {
    return await fetch(`${API_URL}${idUsuario}`);
};

export const getUsuarioWishListByIdWishList = async (idWishList) => {
    return await fetch(`${API_URL}/${idWishList}`);
};

export const getUsuarioWishList = async (usuarioWishList) => {
    return await fetch(`${API_URL}${usuarioWishList.idUsuario}/${usuarioWishList.idWishList}`);
};

export const addUsuarioWishList = async (idUsuario, idWishList) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idUsuario": String(idUsuario).trim(),
            "idWishList": String(idWishList).trim()
        })
    });
};