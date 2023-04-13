from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Reserva import Reserva

class UsuarioReserva:
    def __init__(self, idUsuario = Usuario.id, idReserva = Reserva.id):
        self.idUsuario = idUsuario
        self._idReserva = idReserva

    @property
    def idUsuario(self):
        return self.idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self.idUsuario = idUsuario

    @property
    def idReserva(self):
        return self._idReserva

    @idReserva.setter
    def idReserva(self, idReserva):
        self._idReserva = idReserva

    def toString(self):
        return f"Usuario {self.idUsuario} - Reserva {self.idReserva}"