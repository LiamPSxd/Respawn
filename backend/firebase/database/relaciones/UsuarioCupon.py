from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Cupon import Cupon

class UsuarioCupon:
    def __init__(self, correoUsuario = Usuario.correo, idCupon = Cupon.id, cantidad = 0):
        self._correoUsuario = correoUsuario
        self._idCupon = idCupon
        self._cantidad = cantidad

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

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
        return f"Usuario {self.correoUsuario} - Cupon {self.idCupon}: {self.cantidad}"