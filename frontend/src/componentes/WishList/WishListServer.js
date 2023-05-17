const API_URL = "http://127.0.0.1:8000/firebase/wishlists/";

export const getAllWishLists = async () => {
    return await fetch(API_URL);
};

export const getWishListsByIdWishLists = async (idWishLists) => {
    return await fetch(`${API_URL}${idWishLists}`);
};

export const getWishList = async (idWishList) => {
    return await fetch(`${API_URL}${idWishList}`);
};

export const addWishList = async (wishList) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "id": String(wishList.id).trim()
        })
    });
};