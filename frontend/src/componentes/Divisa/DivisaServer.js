const API_URL = "http://127.0.0.1:8000/firebase/divisas/";

export const getAllDivisas = async () => {
    return await fetch(API_URL);
};

export const getDivisa = async (idDivisa) => {
    return await fetch(`${API_URL}${idDivisa}`);
};

export const addDivisa = async (divisa) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(divisa.id),
            "nombre": String(divisa.nombre).trim(),
            "pais": String(divisa.pais).trim(),
            "valor": String(divisa.valor),
            "simbolo": String(divisa.simbolo).trim()
        })
    });
};

export const updateDivisa = async (divisa) => {
    return await fetch(`${API_URL}${divisa.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(divisa.id),
            "nombre": String(divisa.nombre).trim(),
            "pais": String(divisa.pais).trim(),
            "valor": String(divisa.valor),
            "simbolo": String(divisa.simbolo).trim()
        })
    });
};

export const deleteDivisa = async (idDivisa) => {
    return await fetch(`${API_URL}${idDivisa}`, {
        method: "DELETE"
    });
};