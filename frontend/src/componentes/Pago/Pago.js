import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";
import * as VideojuegoServer from '../Videojuego/VideojuegoServer';
import * as CuponServer from '../Cupon/CuponServer';
import style from './Pago.module.css'

let [cupones, setCupones] = [];
var varTotal;
const Pago = () =>{
    var arrayCantidad = [1,2,5,3]; 
    const history = useNavigate();
    const params = useParams();

    const initialState = {id: 0, nombre: "", descripcion: "", caratula: "", video: "", precio: "", genero: "", plataforma: "", datosExtra: "", calificacion: 0.0};
    const [videojuego, setVideojuego] = useState(initialState);
    [cupones, setCupones] = useState([]);

    const getVideojuego = async (idVideojuego) => {
        try{
            const data = await (await VideojuegoServer.getVideojuego(idVideojuego)).json();
            const { id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion } = data.Videojuegos[0];

            setVideojuego({ id, nombre, descripcion, caratula, video, precio, genero, plataforma, datosExtra, calificacion });
        }catch(error){
            console.log(error);
        }
    };

    function calcIva(videojuego) {
        const precioN = videojuego.precio.split(" ")
        var tasa = 16;
        var monto = precioN[0];
        var iva = (monto*tasa)/100;
        return iva;
    }

    function crearBoton(videojuego, idCupon){
        var button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = 'Deshacer selección del cupón';
        button.id = 'btnDeshacer';
        button.className = 'btn-danger';
        button.onclick = function(){
            var idP = document.getElementById('pTotal');
            var idB = document.getElementById('btnDeshacer');
            var container = document.getElementById(style.containerCupon);
           switch (idCupon) {
            case 0:
                if(videojuego.precio.split(" ")[0]>1000){ 
                    var cupon = document.getElementById("idCupon0");
                    cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                    var cupon = document.getElementById("idCupon3");
                    cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                }else{
                    var cupon = document.getElementById("idCupon0");
                    cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                }
                var cantidad = document.getElementById("cantidadCupon0");
                cantidad.innerHTML = `Disponibles ${arrayCantidad[0]}`
                break;
            case 3:
                var cupon = document.getElementById("idCupon0");
                cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                var cupon = document.getElementById("idCupon3");
                cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                var cantidad = document.getElementById("cantidadCupon3");
                cantidad.innerHTML = `Disponibles ${arrayCantidad[0]}`
                break
            default:
                break;
           }
            idP.innerHTML = calcTotalCompleto(videojuego);
            container.removeChild(idB);
        }
        var container = document.getElementById(style.containerCupon);
        container.appendChild(button);

    }

    function estiloCupon(cuponId,videojuegoPrecio){
        switch (cuponId) {
            case 0:
                return "list-group-item d-flex justify-content-between align-items-start list-group-item-action";
                break;
            case 1:
                return "list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled";
                break;
            case 2:
                return "list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled";
                break;
            case 3:
                if(videojuegoPrecio.split(" ")[0] > 1000){
                    return "list-group-item d-flex justify-content-between align-items-start list-group-item-action";
                    break;
                }else{
                    return "list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled";
                    break;
                }
            default:
                break;
        }
    }

    function calcIvaCompleto(videojuego) {
        const divisa = videojuego.precio.split(" ")
        const iva = calcIva(videojuego);
        return iva + " " +divisa[1];
    }
    
    function calcTotal(videojuego) {
        const divisa = videojuego.precio.split(" ")
        const precioIva = parseFloat(calcIva(videojuego));
        const precioN = parseFloat(videojuego.precio);
        varTotal = precioN+precioIva
        return varTotal;
    }
    
    function calcTotalCompleto(videojuego) {
        const divisa = videojuego.precio.split(" ")
        const total = calcTotal(videojuego) 
        return "$ "+total + " " +divisa[1];
    }
    
    function aplicarCupon(cuponNombre, videojuego){
        switch(cuponNombre){
            case 'Cupón Bienvenida':
                var descuento = calcTotal(videojuego) * 0.15;
                var precioN = videojuego.precio.split(" ");
                varTotal = varTotal - descuento;
                console.log(varTotal);
                var p = document.getElementById("pTotal");
                p.innerHTML = "$ "+varTotal+" "+precioN[1];
                var cupon = document.getElementById("idCupon0");
                cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                var cupon = document.getElementById("idCupon3");
                cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                var cantidad = document.getElementById("cantidadCupon0");
                cantidad.innerHTML = `Disponibles ${arrayCantidad[0]-1}`
                crearBoton(videojuego,0);
                break;
            case 'Cupón De Envío Gratis':
                console.log("Cupón De Envío Gratis");
                break;
            case "Cupón 2x1":
                console.log("Cupón 2x1");
                break;
            case "Cupón De Descuento":
                var descuento = calcTotal(videojuego) * 0.05;
                var precioN = videojuego.precio.split(" ");
                varTotal = varTotal - descuento;
                console.log(varTotal);
                var p = document.getElementById("pTotal");
                p.innerHTML = "$ "+varTotal+" "+precioN[1];
                var cupon = document.getElementById("idCupon3");
                cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                var cupon = document.getElementById("idCupon0");
                cupon.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                var cantidad = document.getElementById("cantidadCupon3");
                cantidad.innerHTML = `Disponibles ${arrayCantidad[0]-1}`
                crearBoton(videojuego,3);
                break;
        }
    }

    useEffect(() => {
        listaCupones(null);
        if(params.id) getVideojuego(params.id);
        // eslint-disable-next-line
    },[]);
    
    return(
        <>
        <div className={style.container}>
            <div className={style.containerImg}>
                <img src={videojuego.caratula} alt="caratula" className={style.img}></img>
            </div>
            <div className={style.containerContent}>
                <h1>{videojuego.nombre}</h1>
                <div className="containerCosts">
                    <h3 className="header3">Precio</h3>
                    <p>${videojuego.precio}</p>
                    <h3 className="iva">IVA</h3>
                    <p>${calcIvaCompleto(videojuego)}</p>
                    <h3>Total</h3>
                    <p id="pTotal">{calcTotalCompleto(videojuego)}{}</p>
                </div>
                <p>Seleccione un método de pago</p>
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                    <button type="button" className="btn-primary" onClick={()=>history(`/pago/videojuego/tarjeta`)}>Tarjeta</button>
                    <button type="button" className="btn-primary" onClick={()=>history(`/pago/videojuego/paypal`)}>PayPal</button>
                </div>
            </div>
            <div className="list-group" id={style.containerCupon}>
                <h4>Cupones Disponibles</h4>
                {cupones.map(cupon=>(
                    <ol className="list-group">
                    <li id={`idCupon${cupon.id}`} className={estiloCupon(cupon.id, videojuego.precio)} onClick={()=>aplicarCupon(cupon.nombre, videojuego)}>
                    <div className="ms-0 me-auto">
                        <div className="fw-bold">{cupon.nombre}</div>
                       <p>Descripción</p>
                    </div>
                    <span className="badge bg-primary rounded-pill" id={`cantidadCupon${cupon.id}`}>Disponibles {arrayCantidad[0]}</span>
                    </li>
                </ol>
                ))}
                <Link to="/cupones">Ver más información</Link>
            </div>
        </div>
        </>
    );
}
export default Pago;

export const listaCupones = async (busqueda) => {
    try{
        const data = await (await CuponServer.getCupones()).json();
        if(busqueda == null){
            setCupones(data.Cupones);
        }else setCupones(recuperarBusqueda(busqueda, data.Cupones));
    }catch(error){
        console.log(error);
    }
};

