from . import Videojuego

class Catalogo:
    def __init__(self, id = 0, nombre = "", contenido: Videojuego = []):
        self.id = id
        self.nombre = nombre
        self.contenido = contenido

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
    def contenido(self):
        return self.contenido

    @contenido.setter
    def contenido(self, contenido):
        self.contenido = contenido

    def toString(self):
        return "Catalogo {}: {}, {}".format(self.id, self.nombre, self.contenido)