import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';


const ModalCalificacion = ()=>{

  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0)
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const indexStart = (index) => {
    setScore(index + 1)
  }
  
  const obtenerCalificacion = () => {
    //recuperaCalificacion(score)
    console.log(score)
    
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Calificar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Califica este juego</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Indica la cantidad de estrellas que se merece</h5>
            <div>
              {
                [... new Array(5)].map((star, index) => {
                  return index < score ? <Icon.StarFill key={index} className='iconStar' onClick={() => indexStart(index)} /> : <Icon.Star key={index} className='iconStar' onClick={() => indexStart(index)} />
                })
              }
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={obtenerCalificacion}>
            Guardar calificacion
          </Button>
          <Button variant="secondary" type='submit' onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCalificacion;

