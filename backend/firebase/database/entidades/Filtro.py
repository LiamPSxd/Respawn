class Filtro:
    def __init__(self, id = 0, nombre = ""):
        self._id = id
        self._nombre = nombre

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def nombre(self):
        return self._nombre

    @nombre.setter
    def nombre(self, nombre):
        self._nombre = nombre

    def toString(self):
        return f"Filtro {self.id}: {self.nombre}"