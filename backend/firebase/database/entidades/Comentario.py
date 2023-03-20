class Comentario:
    def __init__(self, id = 0, titulo = "", contenido = ""):
        self._id = id
        self._titulo = titulo
        self._contenido = contenido

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def titulo(self):
        return self._titulo

    @titulo.setter
    def titulo(self, titulo):
        self._titulo = titulo

    @property
    def contenido(self):
        return self._contenido

    @contenido.setter
    def contenido(self, contenido):
        self._contenido = contenido

    def toString(self):
        return f"Comentario {self.id}: {self.titulo}, {self.contenido}"