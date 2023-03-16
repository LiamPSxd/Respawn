from . import Usuario

class Comentario:
    def __init__(self, id = 0, titulo = "", contenido = "", usuario = Usuario):
        self.id = id
        self.titulo = titulo
        self.contenido = contenido
        self.usuario = usuario

    @property
    def id(self):
        return self.id

    @property
    def titulo(self):
        return self.titulo

    @titulo.setter
    def titulo(self, titulo):
        self.titulo = titulo

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
        return "Comentario {}: {}, {}, {}".format(self.id, self.titulo, self.contenido, self.usuario.getNombre())