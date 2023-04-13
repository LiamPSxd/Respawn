from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Cupon import Cupon

class UsuarioCupon:
    def __init__(self, idUsuario = Usuario.id, idCupon = Cupon.id, cantidad = 0):
        self._idUsuario = idUsuario
        self._idCupon = idCupon
        self._cantidad = cantidad

    @property
    def idUsuario(self):
        return self._idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self._idUsuario = idUsuario

    @property
    def idCupon(self):
        return self._idCupon

    @idCupon.setter
    def idCupon(self, idCupon):
        self._idCupon = idCupon

    @property
    def cantidad(self):
        return self._cantidad

    @cantidad.setter
    def cantidad(self, cantidad):
        self._cantidad = cantidad

    def toString(self):
        return f"Usuario {self.idUsuario} - Cupon {self.idCupon}: {self.cantidad}"