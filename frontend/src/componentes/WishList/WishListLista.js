import React, { useEffect, useState } from "react";
import WishListItem from "./WishListItem";
import * as WishListServer from "./WishListServer";
import * as UsuarioWishListServer from "../Usuario/Relacion/UsuarioWishListServer";
import Cookies from "universal-cookie";

const WishListLista = () => {
    const [wishLists, setWishLists] = useState([]);
    const cookies = new Cookies();

    const listaWishList = async () => {
        try{
            const data = await getContenido();
            setWishLists(data.WishLists);
        }catch(error){
            console.log(error);
        }
    };
    
    const getContenido = async () => {
        const dataUsuarioWishList = await (await UsuarioWishListServer.getUsuarioWishListByIdUsuario(cookies.get("id"))).json();
        let idWishList = "";
    
        if(dataUsuarioWishList.message === "Exitoso")
            await dataUsuarioWishList.UsuarioWishLists.forEach(uw => {
                idWishList += `${uw.idWishList},`;
            });
    
        return await (await WishListServer.getWishList(idWishList)).json();
    };

    useEffect(() => {
        listaWishList();
        // eslint-disable-next-line
    }, []);

    return(
        <><div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
            <div className="list-group">
                {wishLists.map(wishList => (
                    <WishListItem key={wishList.id} wishlist={wishList} />
                ))}
            </div>
        </div></>
    );
};

export default WishListLista;