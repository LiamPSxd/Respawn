import React, { useState } from "react";
import * as TarjetaServer from "./TarjetaServer"
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";    
import style from "./Tarjeta.module.css"

const TarjetaForm = () => {
    const history = useNavigate();
    const cookies = new Cookies();
    let idUsuario = cookies.get("id")
    const initialState = {
        id: 0,
        saldo: 10000,
        tipo: "",
        pan: "",
        fechaCaducidad: "",
        cvv: "",
        titular: ""
    }
    const [tarjeta, setTarjeta] = useState(initialState);
    const handleInputChange = (e) => {
        setTarjeta({ ...tarjeta, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(idUsuario)
        try {
            //Creación de la Tarjeta en la base de datos
            await TarjetaServer.addTarjeta(tarjeta);
            //Creación de la relacion UsuairoTarjeta en la base de datos
            const dataTarjetas = await ((await TarjetaServer.getTarjetas()).json());
            console.log(dataTarjetas)
            dataTarjetas['Tarjetas'].forEach(async element => {
                console.log(element.id)
                if (element.fechaCaducidad === tarjeta.fechaCaducidad && element.titular === tarjeta.titular && element.cvv === tarjeta.cvv) {
                    await TarjetaServer.addUsuarioTarjeta(idUsuario, element.id);
                }
            });
            history('/pago/tarjeta')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='container my-4'>
                <h1 className="text-center" style={{color:"white"}} >Compra con Tarjeta</h1>
                <div className="row">
                    <div className="col" style={{ marginTop: "70px" }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre del titular</label>
                                <input id="nTitular" type="text" className="form-control" name="titular" placeholder="Introduce el nombre del titular de la tarjeta" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Número de tarjeta</label>
                                <input id="nTarjeta" type="number" className="form-control" name="pan" placeholder="Introduce el número de la tarjeta" onChange={handleInputChange} />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Tipo de Tarjeta</label>
                                    <div className="form-check ml-2">
                                        <input className="form-check-input" type="radio" name="tipo" id="credito" value="Débito" onChange={handleInputChange} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Crédito
                                        </label>
                                    </div>
                                    <div className="form-check ml-2">
                                        <input className="form-check-input" type="radio" name="tipo" id="debito" value="Crédito" onChange={handleInputChange} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Débito
                                        </label>
                                    </div>
                                </div>
                                <div className="col ml-0">
                                    <label className="form-label">Fecha de vencimiento</label>
                                    <input id="iFechaVencimiento" type="month" className="form-control" name="fechaCaducidad" style={{ width: "225px" }} onChange={handleInputChange} />
                                </div>
                                <div className="col ml-0 mr-5">
                                    <label className="form-label">CVV</label>
                                    <input id="iCVV" type="password" className="form-control" name="cvv" placeholder="Introduce el CVV" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="text-center" style={{ display: "flex", justifyContent: "space-evenly", marginTop: "50px" }}>
                                <button type="submit" id={style.btn} className="btn" >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TarjetaForm;