import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// var titulo = "", contenido = "";

const Mensaje = (titulo, contenido, estado) => {
    const [show, setShow] = useState(estado);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        {/* <Button variant="primary" onClick={handleShow}>...</Button> */}
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{contenido}</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" type="submit" onClick={handleClose}>Aceptar</Button>
            </Modal.Footer>
        </Modal></>
    );
};

export default Mensaje;

// export const mostrarMensaje = (title, content) => {
//     titulo = title;
//     contenido = content;
// };