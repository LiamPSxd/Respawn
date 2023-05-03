import React, { useState } from "react";
import * as PayPalServer from "./PayPalServer"
import Cookies from "universal-cookie";
import Style from "./PayPal.module.css"
import { Link } from "react-router-dom";
const PayPalForm = () =>{
    const cookies = new Cookies();
    let idUsuario = cookies.get("id")
    const initialState ={
        id: 0,
        saldo: 10000,
        correo: "",
        contrasenia: "",
        titular: ""
    }
    const [paypal, setPaypal] = useState(initialState);
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            //Creación de la entidad PayPal
            await PayPalServer.addPayPal(paypal)
            //Creación de la relación UsuarioPayPals
            const dataPayPals = await(await PayPalServer.getPayPals()).json()
            dataPayPals['PayPals'].forEach(async element => {
                if(element.correo === paypal.correo && element.contrasenia === paypal.contrasenia){
                    await PayPalServer.addUsuarioPayPal(idUsuario, element.id)
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
    const handleInputChange = (e) =>{
        setPaypal({...paypal, [e.target.name]: e.target.value});
    }
     return(
        <>
        <div className='container my-4' id={Style.idContainer}>
        <img id={Style.idImg} src="https://www.paypalobjects.com/marketing/web/us/en/business/smb/shared/icons/paypal-accept-payments.png" alt="imagen PayPal"/>
        <h1 className="text-center">Pagar con PayPal</h1>
        <p>Ingrese su dirección de correo eléctronico y su contraseña para continuar</p>
        <div className="row">
            <div className="col" id={Style.idCol}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input id="iCorreo" onChange={handleInputChange} type="email" className="form-control" name="correo" placeholder="Correo eléctronico o número de celular"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input id="iContrasenia" onChange={handleInputChange} type="password" className="form-control" name="contrasenia" placeholder="Introduce la contraseña"/>
                    </div>
                    <div className="text-center" style={{marginTop:"20px"}}>
                    <Link to="https://www.paypal.com/mx/webapps/mpp/account-selection" target="_blank">¿No tienes una cuenta? Crea una aquí</Link>
                        <button style={{marginTop:"20px"}} type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
export default PayPalForm;

