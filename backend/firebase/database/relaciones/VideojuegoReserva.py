from firebase.database.entidades.Videojuego import Videojuego
from firebase.database.entidades.Reserva import Reserva

class VideojuegoReserva:
    def __init__(self, idVideojuego = Videojuego.id, idReserva = Reserva.id):
        self._idVideojuego = idVideojuego
        self._idReserva = idReserva

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    @property
    def idReserva(self):
        return self._idReserva

    @idReserva.setter
    def idReserva(self, idReserva):
        self._idReserva = idReserva

    def toString(self):
        return f"Videojuego {self.idVideojuego} - Reserva {self.idReserva}"