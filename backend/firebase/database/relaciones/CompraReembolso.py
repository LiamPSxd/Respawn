from firebase.database.entidades.Compra import Compra
from firebase.database.entidades.Reembolso import Reembolso

class CompraReembolso:
    def __init__(self, idCompra = Compra.id, idReembolso = Reembolso.id):
        self._idCompra = idCompra
        self._idReembolso = idReembolso

    @property
    def idCompra(self):
        return self._idCompra

    @idCompra.setter
    def idCompra(self, idCompra):
        self._idCompra = idCompra

    @property
    def idReembolso(self):
        return self._idReembolso

    @idReembolso.setter
    def idReembolso(self, idReembolso):
        self._idReembolso = idReembolso

    def toString(self):
        return f"Compra {self.idCompra} - Reembolso {self.idReembolso}"