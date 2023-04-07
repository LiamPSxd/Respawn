class Catalogo:
    def __init__(self, id = 0, nombre = "", banner = ""):
        self._id = id
        self._nombre = nombre
        self._banner = banner

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

    @property
    def banner(self):
        return self._banner

    @banner.setter
    def banner(self, banner):
        self._banner = banner

    def toString(self):
        return f"Catalogo {self.id}: {self.nombre}, {self.banner}"