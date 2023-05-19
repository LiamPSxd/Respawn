import React from "react";
import style from "./Pago.module.css";

const PagoCuponItem = ({ cupon, cantidad, precio }) => {
    const setDisable = () => {
        switch(cupon.id){
            case 0:
                return cantidad > 0 ? "" : "disabled";
            case 2:
            case 1:
                return "disabled";
            case 3:
                if(precio.valor > 1000 && cantidad > 0) return "";
                else return "disabled";
            default:
                return "";
        }
    };

    const aplicarCupon = () => {
        const pTotal = document.getElementById("pTotal");

        if(pTotal.innerHTML.split(" ")[0] === calcIva()){
            const cant = document.getElementById(style.cantidad);
            let totalPrecio = calcIva();

            switch(cupon.id){
                case 0:
                    totalPrecio -= calcIva() * 0.15;
                    break;
                case 3:
                    totalPrecio -= calcIva() * 0.05;
                    break;
                default:
                    console.log(cupon.nombre);
                    break;
            }

            cant.innerHTML = cantidad -= 1;
            addDeshacer();
            actualizarPrecio(totalPrecio);
        }
    };

    const calcIva = () => parseFloat(precio.valor * 1.16).toFixed(2);

    const actualizarPrecio = (total) => {
        const pTotal = document.getElementById("pTotal");
        pTotal.innerHTML = `${total} ${precio.simbolo}`;
    };

    const addDeshacer = () => {
        const container = document.getElementById("cupones");
        const cant = document.getElementById(style.cantidad);

        const button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "Deshacer selección del cupón";
        button.id = "btnDeshacer";
        button.className = "btn-danger";

        button.onclick = () => {
            cant.innerHTML = cantidad += 1;

            actualizarPrecio(calcIva());
            container.removeChild(document.getElementById("btnDeshacer"));
        }

        container.appendChild(button);
    };

    return(
        <><button key={cupon.id} id={style.item} className={`list-group-item list-group-item-action d-flex gap-3 py-1 ${setDisable()}`} aria-current="true" onClick={() => aplicarCupon()}>
            <img src={cupon.imagen} alt="cuponCaratula" width="64" height="64" className="rounded-circle flex-shrink-0" />

            <div className="d-flex gap-2 w-100 justify-content-between">
                <div id={style.containerCupon}>
                    <h6 className="mb-0"><strong>{cupon.nombre}</strong></h6>
                    <p className="mb-0 opacity-75">Descripción</p>
                </div>

                <small>
                    <span id={style.cantidad} className="badge rounded-pill">{cantidad}</span>
                </small>
            </div>
        </button></>
    );
};

export default PagoCuponItem;