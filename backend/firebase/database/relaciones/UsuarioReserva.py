from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Reserva import Reserva

class UsuarioReserva:
    def __init__(self, correoUsuario = Usuario.correo, idReserva = Reserva.id):
        self._correoUsuario = correoUsuario
        self._idReserva = idReserva

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    @property
    def idReserva(self):
        return self._idReserva

    @idReserva.setter
    def idReserva(self, idReserva):
        self._idReserva = idReserva

    def toString(self):
        return f"Usuario {self.correoUsuario} - Reserva {self.idReserva}"