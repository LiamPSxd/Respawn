import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import * as WishListVideojuegoServer from "../WishList/Relacion/WishListVideojuegoServer";
import Cookies from "universal-cookie";
import style from "./Videojuego.module.css";
import Mensaje from "../Mensaje/Mensaje";

const VideojuegoItem = ({ videojuego, wishList }) => {
    const history = useNavigate();
    const cookies = new Cookies();

    const [fontSize, setFontSize] = useState(0);
    const [corazon, setCorazon] = useState(false);

    const [showMensaje, setShowMensaje] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");

    const mostrarMensaje = (title, content) => {
        setTitulo(title);
        setContenido(content);
        setShowMensaje(!showMensaje);
    };

    const handleTitulo = () => {
        const titulo = videojuego.nombre.length;

        switch(titulo !== null){
            case titulo <= 8:
                setFontSize(2.75);
                break;
            case titulo > 8 && titulo <= 16:
                setFontSize(2.4);
                break;
            case titulo > 16 && titulo < 24:
                setFontSize(2.05);
                break;
            default:
                setFontSize(1.7);
        }
    };

    const handleChange = async (e) => setCorazon(e.target.checked);

    const llenarCorazon = async () => {
        try{
            const data = await (await WishListVideojuegoServer.getWishListVideojuego(wishList.idWishList, videojuego.id)).json();

            if(data.message === "Exitoso") setCorazon(!corazon);
        }catch(error){
            console.log(error);
        }
    };

    const addVideojuegoToWishList = async () => {
        try{
            switch(!corazon){
                case true:
                    const add = await (await WishListVideojuegoServer.addWishListVideojuego(wishList.idWishList, videojuego.id)).json();

                    if(add.message === "Exitoso") mostrarMensaje("Éxito", "Videojuego agregado exitosamente a su WishList");
                    else mostrarMensaje("Error", "No se pudo agregar el Videojuego a su WishList. Por favor, intente más tarde");
                    break;
                case false:
                    const del = await (await WishListVideojuegoServer.deleteWishListVideojuego(wishList.idWishList, videojuego.id)).json();

                    if(del.message === "Exitoso") mostrarMensaje("Éxito", "Videojuego eliminado exitosamente de su WishList");
                    else mostrarMensaje("Error", "No se pudo eliminar el Videojuego de su WishList. Por favor, intente más tarde");
                    break;
                default:
                    mostrarMensaje("Videojuego", `${videojuego.nombre}`);
                    break;
            }
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        handleTitulo();
        if(Object.entries(wishList).length !== 0) llenarCorazon();
        // eslint-disable-next-line
    }, []);

    return(
        <><div id={style.tarjeta} className="card">
            <img id={style.imgCard} className="card-img-top" src={videojuego.caratula} alt="caratula" />

            {cookies.get("id") ? (
                <FormControlLabel id={style.wishlist} control={
                    <Checkbox icon={
                        <FavoriteBorder />
                    } checkedIcon={
                        <Favorite />
                    } name="wishList" color="error" sx={{
                        '& .MuiSvgIcon-root': { fontSize: 45 }
                    }} checked={corazon} onChange={handleChange} />
                } onClick={() => addVideojuegoToWishList()} data-toggle="tooltip" title="Agregar a la WishList" />
            ) : null}

            <div id={style.cardBody} className="card-body">
                <h1 id={style.titulo} className="card-title" style={{fontSize: `${fontSize}em`}}>{videojuego.nombre}</h1>

                <div id={style.contenidoTarjeta}>
                    <h4 className="card-text"><strong>Genero </strong>{videojuego.genero}</h4>
                </div>

                <button className="btn btn-success my-2" onClick={() => history(`/videojuego/${videojuego.id}`)}><strong>Más Detalles</strong></button>
            </div>
        </div>
        
        <Mensaje show={showMensaje} close={mostrarMensaje} title={titulo}>{contenido}</Mensaje></>
    );
};

export default VideojuegoItem;