import React from "react";
import ReactDOM from "react-dom";
import style from "./Mensaje.module.scss";
import buttonClose from "./media/close.svg";
import { useNavigate } from "react-router-dom";

const Mensaje = ({ show, close, title, children, status }) => {
    const history = useNavigate();

    const onclick = () => {
        close();
        iniciarSesion();
    };

    const iniciarSesion = () => {
        if(status) history("/logIn");
    };

    return ReactDOM.createPortal(
        <><div className={`${style.modalContainer} ${show ? style.show : ""}`} onClick={() => close()}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <header className={style.modalHeader}>
                    <h2 className={style.modalHeaderTitle}>{title}</h2>
                    <button className={style.close} onClick={() => close()}>
                        <img src={buttonClose} alt="close" />
                    </button>
                </header>

                <main className={style.modalContent}>
                    <h5>{children}</h5>
                </main>

                <footer className={style.modalFooter}>
                    <button className={style.modalClose} onClick={() => onclick()}>Aceptar</button>
                </footer>
            </div>
        </div></>,
        document.getElementById("mensaje")
    );
};

export default Mensaje;