from firebase.database.entidades.WishList import WishList
from firebase.database.entidades.Videojuego import Videojuego
from firebase.database.entidades.Usuario import Usuario

class WVU:
    def __init__(self, idWishList = WishList.id, idVideojuego = Videojuego.id, correoUsuario = Usuario.correo):
        self._idWishList = idWishList
        self._idVideojuego = idVideojuego
        self._correoUsuario = correoUsuario

    @property
    def idWishList(self):
        return self._idWishList

    @idWishList.setter
    def idWishList(self, idWishList):
        self._idWishList = idWishList

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = core_correoUsuario

    def toString(self):
        return f"WishList {self.idWishList} - Videojuego {self.idVideojuego} - Usuario {self.correoUsuario}"