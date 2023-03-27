import React from 'react';
import "./Popup.module.css";
import { useNavigate } from "react-router-dom";

const Popup=(estado, cambiarEstado)=>{
    const history = useNavigate();
    console.log(estado);
    return (
        <>
        {estado&&
        <div className="overlay">
            <div className="popup">
                <button onClick={()=>history(`/cupones`)} id="btn-cerrar-popup" className="btn btn-danger">x</button>
                <h3>Hey, espera!</h3>
                <p>Necesitas una cuenta para continuar, ¿deseas iniciar sesión ahora?</p>
                <div className="btn-container">
                    <button className="btn btn-primary">Aceptar</button>
                </div>
            </div>
        </div>
        }
        </>
    );
}
export default Popup;