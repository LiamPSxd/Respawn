const API_URL = "http://127.0.0.1:8000/firebase/tarjetas/";
const API_URL_RELACION = "http://127.0.0.1:8000/firebase/usuarioTarjetas/";

export const getTarjetas = async () => {
    return await fetch(API_URL);
};

export const getTarjetasById = async (idTarjeta) => {
    return await fetch(`${API_URL}${idTarjeta}`);
};

export const addTarjeta = async (nuevaTarjeta) =>{
    return await fetch(API_URL, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "saldo": parseFloat(nuevaTarjeta.saldo),
            "tipo": String(nuevaTarjeta.tipo).trim(),
            "pan": String(nuevaTarjeta.pan).trim(),
            "fechaCaducidad": String(nuevaTarjeta.fechaCaducidad).trim(),
            "cvv": parseInt(nuevaTarjeta.cvv),
            "titular": String(nuevaTarjeta.titular).trim(),
        })
    });
};

export const addUsuarioTarjeta = async (idUsuario, idTarjeta) =>{
    return await fetch(API_URL_RELACION, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "idUsuario": String(idUsuario).trim(),
            "idTarjeta": String(idTarjeta).trim(),
        })
    });
};

export const getUsuarioTarjetasById = async (idUsuario) =>{
    return await fetch(`${API_URL_RELACION}${idUsuario}`)
}