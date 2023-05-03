import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { recuperarBusqueda } from "../NavBar/MDBNavBar";
import * as VideojuegoServer from '../Videojuego/VideojuegoServer';
import * as CuponServer from '../Cupon/CuponServer';
import style from './PagoForm.module.css'

let [cupones, setCupones] = [];

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

    const listaCupones = async (busqueda) => {
        try{
            const data = await (await CuponServer.getCupones()).json();
            if(busqueda == null){
                setCupones(data.Cupones);
            }else setCupones(recuperarBusqueda(busqueda, data.Cupones));
        }catch(error){
            console.log(error);
        }
    };

    function calcIva(videojuegoPrecio) {
        return parseFloat(videojuegoPrecio*0.16).toFixed(2);
    }
    function calcIvaCompleto(iva, simbolo) {
        return iva + " " + simbolo
    }
    function calcTotal(videojuegoPrecio, iva) {
        const precio = parseFloat(videojuegoPrecio);
        const aIva = parseFloat(iva)
        return (precio+aIva).toFixed(2)
    }
    function calcTotalCompleto(total, simbolo) {
        return total + " " + simbolo
    }
    
    function crearBoton(videojuego, idCupon){
        const button = document.createElement('button');
        const cupon0 = document.getElementById("idCupon0");
        const cupon3 = document.getElementById("idCupon3");
        button.type = 'button';
        button.innerHTML = 'Deshacer selección del cupón';
        button.id = 'btnDeshacer';
        button.className = 'btn-danger';
        button.onclick = function(){
            const idP = document.getElementById('pTotal');
            const idB = document.getElementById('btnDeshacer');
            const container = document.getElementById(style.containerCupon);
           switch (idCupon) {
            case 0:
                if(videojuego.precio.valor>1000){ 
                    cupon0.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                    cupon3.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                }else{
                    cupon0.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                }
                const cantidad0 = document.getElementById("cantidadCupon0");
                cantidad0.innerHTML = `Disponibles ${arrayCantidad[0]}`
                break;
            case 3:
                cupon0.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                cupon3.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action");
                const cantidad3 = document.getElementById("cantidadCupon3");
                cantidad3.innerHTML = `Disponibles ${arrayCantidad[0]}`
                break
            default:
                break;
           }
            idP.innerHTML = "$ " + calcTotalCompleto(calcTotal(videojuego.precio.valor,calcIva(videojuego.precio.valor)),videojuego.precio.simbolo);
            container.removeChild(idB);
        }
        var container = document.getElementById(style.containerCupon);
        container.appendChild(button);

    }

    function aplicarCupon(cuponNombre, videojuegoTotal, simbolo){
        var varTotal;
        const p = document.getElementById("pTotal");
        const cupon0 = document.getElementById("idCupon0");
        const cantidadDisponible0 = document.getElementById("cantidadCupon0");
        const cupon3 = document.getElementById("idCupon3");
        const cantidadDisponible3 = document.getElementById("cantidadCupon3");
        switch(cuponNombre){
            case 'Cupón Bienvenida':
                varTotal = videojuegoTotal - (videojuegoTotal * 0.15)
                p.innerHTML = "$ " + varTotal + " " + simbolo;
                cupon0.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                cupon3.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                cantidadDisponible0.innerHTML = `Disponibles ${arrayCantidad[0]-1}`
                crearBoton(videojuego,0);
                break;
            case 'Cupón De Envío Gratis':
                console.log("Cupón De Envío Gratis");
                break;
            case "Cupón 2x1":
                console.log("Cupón 2x1");
                break;
            case "Cupón De Descuento":
                varTotal = videojuegoTotal - (videojuegoTotal * 0.05)
                p.innerHTML = "$ " + varTotal + " " + simbolo;
                cupon0.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                cupon3.setAttribute("class","list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled");
                cantidadDisponible3.innerHTML = `Disponibles ${arrayCantidad[0]-1}`
                crearBoton(videojuego,3);
                break;
            default:
                break;
        }
    }

    function estiloCupon(cuponId,videojuegoPrecio){
        switch (cuponId) {
            case 0:
                return "list-group-item d-flex justify-content-between align-items-start list-group-item-action";
            case 1:
                return "list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled";
            case 2:
                return "list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled";
            case 3:
                if(videojuegoPrecio > 1000){
                    return "list-group-item d-flex justify-content-between align-items-start list-group-item-action";
                }else{
                    return "list-group-item d-flex justify-content-between align-items-start list-group-item-action disabled";
                }
            default:
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
                    <p>${videojuego.precio.valor+ " " + videojuego.precio.simbolo}</p>
                    <h3 className="iva">IVA</h3>
                    <p>${calcIvaCompleto(calcIva(videojuego.precio.valor), videojuego.precio.simbolo)}</p>
                    <h3>Total</h3>
                    <p id="pTotal">${calcTotalCompleto(calcTotal(videojuego.precio.valor, calcIva(videojuego.precio.valor)), videojuego.precio.simbolo)}</p>
                </div>
                <p>Seleccione un método de pago</p>
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                    <button type="button" className="btn-primary" onClick={()=>history(`/pago/${params.id}/tarjetas`)}>Tarjeta</button>
                    <button type="button" className="btn-primary" onClick={()=>history(`/pago/${params.id}/paypal`)}>PayPal</button>
                </div>
            </div>
            <div className="list-group" id={style.containerCupon}>
                <h4>Cupones Disponibles</h4>
                {cupones.map(cupon=>(
                    <ol className="list-group">
                    <li id={`idCupon${cupon.id}`} className={estiloCupon(cupon.id, videojuego.precio.valor)} onClick={()=>aplicarCupon(cupon.nombre, calcTotal(videojuego.precio.valor, calcIva(videojuego.precio.valor)), videojuego.precio.simbolo)}>
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



