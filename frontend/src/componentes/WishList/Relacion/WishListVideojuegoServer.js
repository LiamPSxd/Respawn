const API_URL = "http://127.0.0.1:8000/firebase/wishlistVideojuegos/";

export const getAllWishListVideojuegos = async () => {
    return await fetch(API_URL);
};

export const getWishListVideojuegoByIdWishList = async (idWishList) => {
    return await fetch(`${API_URL}${idWishList}`);
};

export const getWishListVideojuegoByIdVideojuego = async (idVideojuego) => {
    return await fetch(`${API_URL}/${idVideojuego}`);
};

export const getWishListVideojuego = async (idWishList, idVideojuego) => {
    return await fetch(`${API_URL}${idWishList}/${idVideojuego}`);
};

export const addWishListVideojuego = async (idWishList, idVideojuego) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idWishList": String(idWishList).trim(),
            "idVideojuego": String(idVideojuego).trim()
        })
    });
};

export const deleteWishListVideojuego = async (idWishList, idVideojuego) => {
    return await fetch(`${API_URL}${idWishList}/${idVideojuego}`, {
        method: "DELETE"
    });
};