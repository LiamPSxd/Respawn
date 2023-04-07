const API_URL = "http://127.0.0.1:8000/firebase/cupones/";

export const getCupones = async () => {
    return await fetch(API_URL);
};