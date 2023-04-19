import React from "react";
const TarjetaForm = () =>{
    return(
        <>
        <div className='container my-4'>
        <h1 className="text-center">Compra con Tarjeta</h1>
        <div className="row">
            <div className="col" style={{marginTop:"70px"}}>
            <form>
                    <div className="mb-3">
                        <label className="form-label">Nombre del titular</label>
                        <input id="nTitular" type="text" className="form-control" name="nTitular" placeholder="Introduce el nombre del titular de la tarjeta"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de tarjeta</label>
                        <input id="nTarjeta" type="number" className="form-control" name="nTarjeta" placeholder="Introduce el número de la tarjeta"/>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Fecha de vencimiento</label>
                            <input id="iFechaVencimiento" type="month" className="form-control" name="FechaVencimiento"/>
                        </div>
                        <div className="col">
                            <label className="form-label">CVV</label>
                            <input id="iContrasenia" type="number" className="form-control" name="contrasenia" placeholder="Introduce el CVV de la tarjeta"/>
                        </div>
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
export default TarjetaForm;