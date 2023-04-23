import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as VideojuegoServer from '../Videojuego/VideojuegoServer';
import { useNavigate} from "react-router-dom";


const ModalCalificacion = ({videojuego }) => {

  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0)


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const indexStart = (index) => {
    setScore(index + 1)
  }

  const updateVideojuego = async (videojuego) => {
    try {
      await (await VideojuegoServer.updateVideojuego(videojuego)).json();
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCalificacion = () => {
    videojuego.calificacion=score;
    updateVideojuego(videojuego);
    history(`/videojuego/${videojuego.id}`)

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
              /*eslint rest-spread-spacing: ["error", "never"]*/
              [...new Array(5)].map((star, index) => {
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

