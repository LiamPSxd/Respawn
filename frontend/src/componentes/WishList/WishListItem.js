import React, { useEffect, useState } from "react";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";
import * as WishListVideojuegoServer from "./Relacion/WishListVideojuegoServer";
import * as VideojuegoServer from "../Videojuego/VideojuegoServer";
import style from "./WishList.module.css";

let [videojuegos, setVideojuegos] = [];

const WishListItem = ({ wishlist }) => {
    [videojuegos, setVideojuegos] = useState([]);

    useEffect(() => {
        getVideojuegos(null, wishlist.id);
        // eslint-disable-next-line
    }, []);

    return(
        <>{videojuegos.length > 0 ? (
            videojuegos.map(videojuego => (
                <a key={videojuego.id} id={style.item} href={`/videojuego/${videojuego.id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <img src={videojuego.caratula} alt="videojuegoCaratula" width="116" height="116" className="rounded-circle flex-shrink-0" />

                    <div className="d-flex gap-2 w-100 justify-content-around">
                        <div id={style.text}>
                            <h4 className="mb-0"><strong>{videojuego.nombre}</strong></h4>
                            <h5 className="mb-0 opacity-75"><strong>Género</strong> {videojuego.genero}</h5>
                        </div>

                        <h6 className="opacity-50 text-nowrap"><strong>{videojuego.precio.valor} {videojuego.precio.simbolo}</strong></h6>
                    </div>
                </a>
        ))) : (
            <a id={style.item} href="/catalogo" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <div className="d-flex gap-2 w-100 justify-content-around">
                    <div>
                        <h5 className="mb-0"><strong>No hay videojuegos por mostrar</strong></h5>
                        <h6 className="mb-0 opacity-75">Agregué alguno para mostrarlo aquí</h6>
                    </div>
                </div>
            </a>
        )}</>
    );
};

export default WishListItem;

export let wishListId = -1;

export const getVideojuegos = async (busqueda, idWishList) => {
    try{
        wishListId = idWishList;
        const data = await getContenido(idWishList);

        if(busqueda == null) setVideojuegos(data);
        else setVideojuegos(recuperarBusqueda(busqueda, data));
    }catch(error){
        console.log(error);
    }
};

const getContenido = async (idWishList) => {
    const dataWishListVideojuego = await (await WishListVideojuegoServer.getWishListVideojuegoByIdWishList(idWishList)).json();
    let idVideojuegos = ",";

    if(dataWishListVideojuego.message === "Exitoso")
        await dataWishListVideojuego.WishListVideojuegos.forEach(wv => {
            idVideojuegos += `${wv.idVideojuego},`;
        });

    const dataVideojuego = await (await VideojuegoServer.getVideojuegosByIdVideojuegos(idVideojuegos)).json();

    if(dataVideojuego.message === "Exitoso") return dataVideojuego.Videojuegos;
    else return null;
};