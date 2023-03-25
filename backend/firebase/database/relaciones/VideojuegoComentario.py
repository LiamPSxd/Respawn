from firebase.database.entidades.Videojuego import Videojuego
from firebase.database.entidades.Comentario import Comentario

class VideojuegoComentario:
    def __init__(self, idVideojuego = Videojuego.id, idComentario = Comentario.id):
        self._idVideojuego = idVideojuego
        self._idComentario = idComentario

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    @property
    def idComentario(self):
        return self._idComentario

    @idComentario.setter
    def idComentario(self, idComentario):
        self._idComentario = idComentario

    def toString(self):
        return f"Videojuego {self.idVideojuego} - Comentario {self.idComentario}"