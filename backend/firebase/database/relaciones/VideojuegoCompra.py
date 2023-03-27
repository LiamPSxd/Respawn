from firebase.database.entidades.Videojuego import Videojuego
from firebase.database.entidades.Compra import Compra

class VideojuegoCompra:
    def __init__(self, idVideojuego = Videojuego.id, idCompra = Compra.id):
        self._idVideojuego = idVideojuego
        self._idCompra = idCompra

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    @property
    def idCompra(self):
        return self._idCompra

    @idCompra.setter
    def idCompra(self, idCompra):
        self._idCompra = idCompra

    def toString(self):
        return f"Videojuego {self.idVideojuego} - Compra {self.idCompra}"