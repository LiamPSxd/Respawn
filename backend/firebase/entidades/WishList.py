from . import Videojuego, Usuario

class WishList:
    def __init__(self, id = 0, contenido: Videojuego = [], usuario = Usuario):
        self.id = id
        self.contenido = contenido
        self.usuario = usuario

    @property
    def id(self):
        return self.id

    @property
    def contenido(self):
        return self.contenido
    
    @contenido.setter
    def contenido(self, contenido):
        self.contenido = contenido

    @property
    def usuario(self):
        return self.usuario
    
    @usuario.setter
    def usuario(self, usuario):
        self.usuario = usuario

    def toString(self):
        return "WishList {}: {}, {}".format(self.id, self.contenido, self.usuario.getNombre())