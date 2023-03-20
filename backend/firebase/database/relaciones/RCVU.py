from firebase.database.entidades.Reserva import Reserva
from firebase.database.entidades.Cupon import Cupon
from firebase.database.entidades.Videojuego import Videojuego
from firebase.database.entidades.Usuario import Usuario

class RCVU:
    def __init__(self, idReserva = Reserva.id, idCupon = Cupon.id, idVideojuego = Videojuego.id, correoUsuario = Usuario.correo):
        self._idReserva = idReserva
        self._idCupon = idCupon
        self._idVideojuego = idVideojuego
        self._correoUsuario = correoUsuario

    @property
    def idReserva(self):
        return self._idReserva

    @idReserva.setter
    def idReserva(self, idReserva):
        self._idReserva = idReserva

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
        return f"Reserva {self.idReserva} - Cupon {self.idCupon} - Videojuego {self.idVideojuego} - Usuario {self.correoUsuario}"