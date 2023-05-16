const API_URL = "http://127.0.0.1:8000/firebase/usuarioCupones/";

export const getAllUsuarioCupones = async () => {
    return await fetch(API_URL);
};

export const getUsuarioCuponByIdUsuario = async (idUsuario) => {
    return await fetch(`${API_URL}${idUsuario}`);
};

export const getUsuarioCuponByIdCupon = async (idCupon) => {
    return await fetch(`${API_URL}/${idCupon}`);
};

export const getUsuarioCupon = async (usuarioCupon) => {
    return await fetch(`${API_URL}${usuarioCupon.idUsuario}/${usuarioCupon.idCupon}`);
};

export const addUsuarioCupon = async (usuarioCupon) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idUsuario": String(usuarioCupon.idUsuario).trim(),
            "idCupon": String(usuarioCupon.idCupon).trim(),
            "cantidad": String(usuarioCupon.cantidad)
        })
    });
};