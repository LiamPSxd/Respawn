from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Tarjeta import Tarjeta

class UsuarioTarjeta:
    def __init__(self, correoUsuario = Usuario.correo, idTarjeta = Tarjeta.id):
        self._correoUsuario = correoUsuario
        self._idTarjeta = idTarjeta

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    @property
    def idTarjeta(self):
        return self._idTarjeta

    @idTarjeta.setter
    def idTarjeta(self, idTarjeta):
        self._idTarjeta = idTarjeta

    def toString(self):
        return f"Usuario {self.correoUsuario} - Tarjeta {self.idTarjeta}"