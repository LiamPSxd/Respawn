from . import Catalogo

class Filtro:
    def __init__(self, id = 0, nombre = "", catalogo: Catalogo = []):
        self.id = id
        self.nombre = nombre
        self.catalogo = catalogo

    @property
    def id(self):
        return self.id

    @property
    def nombre(self):
        return self.nombre

    @nombre.setter
    def nombre(self, nombre):
        self.nombre = nombre

    @property
    def catalogo(self):
        return self.catalogo
    
    @catalogo.setter
    def catalogo(self, catalogo):
        self.catalogo = catalogo

    def toString(self):
        return "Filtro {}: {}, {}".format(self.id, self.nombre, self.catalogo.nombre)