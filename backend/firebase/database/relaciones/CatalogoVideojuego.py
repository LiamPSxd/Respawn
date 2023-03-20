from firebase.database.entidades.Catalogo import Catalogo
from firebase.database.entidades.Videojuego import Videojuego

class CatalogoVideojuego:
    def __init__(self, idCatalogo = Catalogo.id, idVideojuego = Videojuego.id):
        self._idCatalogo = idCatalogo
        self._idVideojuego = idVideojuego

    @property
    def idCatalogo(self):
        return self._idCatalogo

    @idCatalogo.setter
    def idCatalogo(self, idCatalogo):
        self._idCatalogo = idCatalogo

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    def toString(self):
        return f"Catalogo {self.idCatalogo} - Videojuego {self.idVideojuego}"