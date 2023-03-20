from firebase.database.entidades.Compra import Compra
from firebase.database.entidades.Cupon import Cupon
from firebase.database.entidades.Videojuego import Videojuego
from firebase.database.entidades.Usuario import Usuario

class CCVU:
    def __init__(self, idCompra = Compra.id, idCupon = Cupon.id, idVideojuego = Videojuego.id, correoUsuario = Usuario.correo):
        self._idCompra = idCompra
        self._idCupon = idCupon
        self._idVideojuego = idVideojuego
        self._correoUsuario = correoUsuario

    @property
    def idCompra(self):
        return self._idCompra

    @idCompra.setter
    def idCompra(self, idCompra):
        self._idCompra = idCompra

    @property
    def idCupon(self):
        return self._idCupon

    @idCupon.setter
    def idCupon(self, idCupon):
        self._idCupon = idCupon

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
        self._correoUsuario = correoUsuario

    def toString(self):
        return f"Compra {self.idCompra} - Cupon {self.idCupon} - Videojuego {self.idVideojuego} - Usuario {self.correoUsuario}"