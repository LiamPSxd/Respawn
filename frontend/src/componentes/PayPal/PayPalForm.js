import React from "react";
const PayPalForm = () =>{
    return(
        <>
        <div className='container my-4'>
        <h1 className="text-center">Compra con PayPal</h1>
        <div className="row">
            <div className="col" style={{marginTop:"70px"}}>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input id="iCorreo" type="email" className="form-control" name="correo" placeholder="Introduce el correo electrónico asociado a PayPal"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input id="iContrasenia" type="password" className="form-control" name="contrasenia" placeholder="Introduce la contraseña"/>
                    </div>
                    <div className="text-center" style={{display:"flex", justifyContent:"space-evenly", marginTop:"50px"}}>
                        <button type="submit" className="btn btn-success">Pagar</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
export default PayPalForm;

