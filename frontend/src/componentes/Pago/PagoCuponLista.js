import React from "react";
import PagoCuponItem from "./PagoCuponItem";

const PagoCuponLista = ({ cupones, cantidades, precio }) => {
    return(
        <><div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-2 align-items-center justify-content-center">
            <div className="list-group">
                {cupones.map(cupon => (
                    cantidades.filter(cantidad => cantidad.idCupon === cupon.id)
                    .map(cantidad => (
                        <PagoCuponItem key={cupon.id} cupon={cupon} cantidad={cantidad.cantidad} precio={precio} />
                    ))
                ))}
            </div>
        </div></>
    );
};

export default PagoCuponLista;