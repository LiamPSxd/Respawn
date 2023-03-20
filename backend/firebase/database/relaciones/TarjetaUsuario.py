from firebase.database.entidades.Tarjeta import Tarjeta
from firebase.database.entidades.Usuario import Usuario

class TarjetaUsuario:
    def __init__(self, idTarjeta = Tarjeta.id, correoUsuario = Usuario.correo):
        self._idTarjeta = idTarjeta
        self._correoUsuario = correoUsuario

    @property
    def idTarjeta(self):
        return self._idTarjeta

    @idTarjeta.setter
    def idTarjeta(self, idTarjeta):
        self._idTarjeta = idTarjeta

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    def toString(self):
        return f"Tarjeta {self.idTarjeta} - Usuario {self.correoUsuario}"