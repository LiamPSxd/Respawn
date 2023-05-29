import React from "react";
import style from "./Pago.module.css";
import Cookies from "universal-cookie";

const PagoCuponItem = ({ cupon, cantidad, precio }) => {
    const cookies = new Cookies();
    cookies.set("idCupon",null)
    cookies.set("cantidadCupon",null)
    cookies.set("dCupon",0.0)
    const setDisable = () => {
        switch(cupon.id){
            case 0:
                return cantidad > 0 ? "" : "disabled";
            case 2:
            case 1:
                return "disabled";
            case 3:
                if(precio.valor >= 1000 && cantidad > 0) return "";
                else return "disabled";
            default:
                return "";
        }
    };

    const aplicarCupon = () => {
        const pTotal = document.getElementById("pTotal");
        var descuento = 0.0

        if(parseFloat(pTotal.innerHTML.split(" ")[0]) === parseFloat(calcIva())){
            const cant = document.getElementById(`cantidad${cupon.id}`);
            let totalPrecio = calcIva();
            switch(cupon.id){
                case 0:
                    descuento = totalPrecio * 0.15
                    cookies.set("idCupon",cupon.id)
                    cookies.set("cantidadCupon",cantidad-1)
                    cookies.set("dCupon",descuento)
                    totalPrecio -= calcIva() * 0.15;
                    break;
                case 3:
                    descuento = totalPrecio * 0.05
                    cookies.set("idCupon",cupon.id)
                    cookies.set("cantidadCupon",cantidad-1)
                    cookies.set("dCupon",descuento)
                    totalPrecio -= calcIva() * 0.05;
                    break;
                default:
                    console.log(cupon.nombre);
                    break;
            }

            cant.innerHTML = cantidad -= 1;
            addDeshacer();
            actualizarPrecio(totalPrecio.toFixed(2));
        }
    };

    const calcIva = () => parseFloat(precio.valor * 1.16).toFixed(2);

    const actualizarPrecio = (total) => {
        const pTotal = document.getElementById("pTotal");
        pTotal.innerHTML = `${total} ${precio.simbolo}`;
    };

    const addDeshacer = () => {
        const container = document.getElementById("cupones");
        const cant = document.getElementById(`cantidad${cupon.id}`);

        const button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "Deshacer selección del cupón";
        button.id = "btnDeshacer";
        button.className = "btn-danger";

        button.onclick = () => {
            cant.innerHTML = cantidad += 1;

            actualizarPrecio(calcIva());
            container.removeChild(document.getElementById("btnDeshacer"));
            cookies.set("dCupon",0.0)
            cookies.set("idCupon",null)
            cookies.set("cantidadCupon",null)
        }

        container.appendChild(button);
    };

    return(
        <><button key={cupon.id} id={style.item} className={`list-group-item list-group-item-action d-flex gap-3 py-1 ${setDisable()}`} aria-current="true" onClick={() => aplicarCupon()}>
            <img src={cupon.imagen} alt="cuponCaratula" width="64" height="64" className="rounded-circle flex-shrink-0" />

            <div className="d-flex gap-2 w-100 justify-content-between">
                <div id={style.containerCupon}>
                    <h6 className="mb-0" id={style.tituloCupon}>{cupon.nombre}</h6>
                    <p className="mb-0 opacity-75">Descripción</p>
                </div>

                <small>
                    <span id={`cantidad${cupon.id}`} className={style.cantidad}>{cantidad}</span>
                </small>
            </div>
        </button></>
    );
};

export default PagoCuponItem;