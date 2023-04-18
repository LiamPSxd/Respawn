import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Mensaje = ({ titulo, contenido, estado}) => {
    const [show, setShow] = useState(estado);

    const handleClose = () => setShow(false);

    return(
        <><Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{contenido}</Modal.Body>

            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={handleClose}>Aceptar</Button>
            </Modal.Footer>
        </Modal></>
    );
};

export default Mensaje;