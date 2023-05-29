import React, { useEffect, useState } from "react";
import WishListItem from "./WishListItem";
import * as WishListServer from "./WishListServer";
import * as UsuarioWishListServer from "../Usuario/Relacion/UsuarioWishListServer";
import Cookies from "universal-cookie";
import Mensaje from "../Mensaje/Mensaje";

const WishListLista = () => {
    const [wishLists, setWishLists] = useState([]);
    const cookies = new Cookies();

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [showMensaje, setShowMensaje] = useState(false);

    const mostrarMensaje = (title, content) => {
        setTitulo(title);
        setContenido(content);
        setShowMensaje(!showMensaje);
    };

    const listaWishList = async () => {
        try{
            const data = await getContenido();

            if(data.message === "Exitoso") setWishLists(data.WishLists);
            else mostrarMensaje("Error", "Se perdió la conexión con la Base de Datos. Por favor, intente más tarde");
        }catch(error){
            mostrarMensaje("Error", "Se perdió la conexión con la Base de Datos. Por favor, intente más tarde");
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
        </div>
        
        <Mensaje show={showMensaje} close={mostrarMensaje} title={titulo} status={false}>{contenido}</Mensaje></>
    );
};

export default WishListLista;