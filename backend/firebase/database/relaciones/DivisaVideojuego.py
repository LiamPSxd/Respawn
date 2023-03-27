from firebase.database.entidades.Divisa import Divisa
from firebase.database.entidades.Videojuego import Videojuego

class DivisaVideojuego:
    def __init__(self, idDivisa = Divisa.id, idVideojuego = Videojuego.id):
        self._idDivisa = idDivisa
        self._idVideojuego = idVideojuego

    @property
    def idDivisa(self):
        return self._idDivisa

    @idDivisa.setter
    def idDivisa(self, idDivisa):
        self._idDivisa = idDivisa

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    def toString(self):
        return f"Divisa {self.idDivisa} - Videojuego {self.idVideojuego}"