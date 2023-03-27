const API_URL = "http://127.0.0.1:8000/firebase/divisas/";
const API_CURRENCY = "https://api.currencyapi.com/v3/latest?apikey=ADWFsMeOzhBOlQF9CDsHKXVb9rqh7GRlOMW6Nj71&currencies=&base_currency="

export const getAllCurrencies = async (baseCurrency) => {
    return await fetch(`${API_CURRENCY}${baseCurrency}`);
}

export const getAllDivisas = async () => {
    return await fetch(API_URL);
};

export const getDivisa = async (idDivisa) => {
    return await fetch(`${API_URL}${idDivisa}`);
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
            "simbolo": String(divisa.simbolo).trim(),
            "seleccionado": Boolean(divisa.seleccionado),
            "hora": String(divisa.hora)
        })
    });
};