from . import Compra

class Reembolso:
    def __init__(self, id = 0, compra = Compra):
        self.id = id
        self.compra = compra

    @property
    def id(self):
        return self.id

    @property
    def compra(self):
        return self.compra
    
    @compra.setter
    def compra(self, compra):
        self.compra = compra

    def toString(self):
        return "Reembolso {}: {}".format(self.id, self.compra.getId())