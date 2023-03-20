from firebase.database.entidades.Reembolso import Reembolso
from firebase.database.entidades.Compra import Compra

class ReembolsoCompra:
    def __init__(self, idReembolso = Reembolso.id, idCompra = Compra.id):
        self._idReembolso = idReembolso
        self._idCompra = idCompra

    @property
    def idReembolso(self):
        return self._idReembolso

    @idReembolso.setter
    def idReembolso(self, idReembolso):
        self._idReembolso = idReembolso

    @property
    def idCompra(self):
        return self._idCompra

    @idCompra.setter
    def idCompra(self, idCompra):
        self._idCompra = idCompra

    def toString(self):
        return f"Reembolso {self.idReembolso} - Compra {self.idCompra}"