import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as DivisaServer from "./DivisaServer";

const DivisaForm = () => {
    const history = useNavigate();
    const params = useParams();

    const initialState = {id: 0, nombre: "", pais: "", valor: "", simbolo: ""};
    const [divisa, setDivisa] = useState(initialState);
    
    const handleInputChange = (e) => {
        setDivisa({ ...divisa, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            if(!params.id){
                const data = await (await DivisaServer.addDivisa(divisa)).json();

                if(data.message === "Exitoso"){
                    setDivisa(initialState);
                }
            }else await DivisaServer.updateDivisa(divisa);

            history("/monedaPeso");
        }catch(error){
            console.log(error);
        }
    };

    const getDivisa = async (idDivisa) => {
        try{
            const data = await (await DivisaServer.getDivisa(idDivisa)).json();
            const { id, nombre, pais, valor, simbolo } = data.Divisas[0];

            setDivisa({ id, nombre, pais, valor, simbolo });
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        if(params.id) getDivisa(params.id);
        // eslint-disable-next-line
    }, []);

    return(
        <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Divisa</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" value={divisa.nombre ? divisa.nombre : ""} onChange={handleInputChange} className="form-control" minLength="1" maxLength="20" autoFocus required />
                </div>
            
                <div className="mb-3">
                    <label className="form-label">Simbolo</label>
                    <input type="text" name="simbolo" value={divisa.simbolo ? divisa.simbolo : ""} onChange={handleInputChange} className="form-control" minLength="1" maxLength="3" autoFocus required />
                </div>
            
                <div className="mb-3">
                  <label className="form-label">Valor</label>
                  <input type="number" name="valor" value={divisa.valor ? divisa.valor : 0} onChange={handleInputChange} className="form-control" min="0" max="9999999999" required />
                </div>
            
                <div className="mb-3">
                  <label className="form-label">País</label>
                  <input type="text" name="pais" value={divisa.pais ? divisa.pais : ""} onChange={handleInputChange} className="form-control" minLength="1" maxLength="30" autoFocus required />
                </div>
            
                <div className="d-grid gap-2">
                    {params.id ? (
                        <button type="submit" className="btn btn-block btn-primary">
                            Actualizar
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-block btn-success">
                            Añadir
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default DivisaForm;