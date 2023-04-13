const API_URL = "http://127.0.0.1:8000/firebase/usuarios/";

export const getAllUsuarios = async () => {
    return await fetch(API_URL);
};

export const getUsuario = async (idUsuario) => {
    return await fetch(`${API_URL}${idUsuario}`);
};

export const getUsuarioByCorreo = async (correoUsuario) => {
    return await fetch(`${API_URL}/${correoUsuario}`);
};

export const addUsuario = async (usuario) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(usuario.id).trim(),
            "nombre": String(usuario.nombre).trim(),
            "correo": String(usuario.correo).trim(),
            "contrasenia": String(usuario.contrasenia).trim(),
            "domicilio": String(usuario.domicilio).trim()
        })
    });
};

export const updateUsuario = async (usuario) => {
    return await fetch(`${API_URL}${usuario.correo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(usuario.id).trim(),
            "nombre": String(usuario.nombre).trim(),
            "correo": String(usuario.correo).trim(),
            "contrasenia": String(usuario.contrasenia).trim(),
            "domicilio": String(usuario.domicilio).trim()
        })
    });
};

export const deleteUsuario = async (correoUsuario) => {
    return await fetch(`${API_URL}${correoUsuario}`, {
        method: "DELETE"
    });
};