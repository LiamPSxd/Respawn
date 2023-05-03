const API_URL = "http://127.0.0.1:8000/firebase/paypals/"
const API_URL_RELACION = "http://127.0.0.1:8000/firebase/usuarioPayPals/"

export const getPayPals = async () =>{
    return await fetch(API_URL)
}

export const addPayPal = async (newPayPal) =>{
    return await fetch(API_URL, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "saldo": parseFloat(newPayPal.saldo),
            "correo": String(newPayPal.correo).trim(),
            "contrasenia": String(newPayPal.contrasenia).trim(),
            "titular": String(newPayPal.titular).trim(),
        })
    });
};

export const addUsuarioPayPal = async (idUsuario, idPayPal) =>{
    return await fetch(API_URL_RELACION,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "idUsuario": String(idUsuario).trim(),
            "idPayPal": String(idPayPal).trim(),
        })
    })
}