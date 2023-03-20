from firebase.database.entidades.Videojuego import Videojuego
from firebase.database.entidades.Oferta import Oferta

class VideojuegoOferta:
    def __init__(self, idVideojuego = Videojuego.id, idOferta = Oferta.id):
        self._idVideojuego = idVideojuego
        self._idOferta = idOferta

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    @property
    def idOferta(self):
        return self._idOferta

    @idOferta.setter
    def idOferta(self, idOferta):
        self._idOferta = idOferta

    def toString(self):
        return f"Videojuego {self.idVideojuego} - Oferta {self.idOferta}"