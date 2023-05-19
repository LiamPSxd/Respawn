const API_URL = "http://127.0.0.1:8000/firebase/compras/";

export const getAllCompras = async () => {
    return await fetch(API_URL);
};

export const getComprasByIdCompras = async (idCompras) => {
    return await fetch(`${API_URL}${idCompras}`);
};

export const getCompra = async (idCompra) => {
    return await fetch(`${API_URL}${idCompra}`);
};

export const addCompra = async (Compra) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(Compra.id),
            "fecha": String(Compra.fecha),
            "hora": String(Compra.hora),
            "iva": String(Compra.iva),
            "descuento": String(Compra.descuento),
            "monto": String(Compra.monto),
            "metodo": String(Compra.metodo),
            "descripcion": String(Compra.descripcion),
        })
    });
};