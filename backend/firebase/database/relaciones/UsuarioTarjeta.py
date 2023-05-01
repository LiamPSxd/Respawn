from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Tarjeta import Tarjeta

class UsuarioTarjeta:
    def __init__(self, idUsuario = Usuario.id, idTarjeta = Tarjeta.id):
        self._idUsuario = idUsuario
        self._idTarjeta = idTarjeta

    @property
    def idUsuario(self):
        return self.idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self.idUsuario = idUsuario

    @property
    def idTarjeta(self):
        return self._idTarjeta

    @idTarjeta.setter
    def idTarjeta(self, idTarjeta):
        self._idTarjeta = idTarjeta

    def toString(self):
        return f"Usuario {self.idUsuario} - Tarjeta {self.idTarjeta}"
