from firebase.database.entidades.Reserva import Reserva
from firebase.database.entidades.Reembolso import Reembolso

class ReservaReembolso:
    def __init__(self, idReserva = Reserva.id, idReembolso = Reembolso.id):
        self._idReserva = idReserva
        self._idReembolso = idReembolso

    @property
    def idReserva(self):
        return self._idReserva

    @idReserva.setter
    def idReserva(self, idReserva):
        self._idReserva = idReserva

    @property
    def idReembolso(self):
        return self._idReembolso

    @idReembolso.setter
    def idReembolso(self, idReembolso):
        self._idReembolso = idReembolso

    def toString(self):
        return f"Reserva {self.idReserva} - Reembolso {self.idReembolso}"