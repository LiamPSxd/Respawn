class Divisa:
    def __init__(self, id = 0, nombre = "", pais = "", valor = "", simbolo = ""):
        self._id = id
        self._nombre = nombre
        self._pais = pais
        self._valor = valor
        self._simbolo = simbolo

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
    def pais(self):
        return self._pais
    
    @pais.setter
    def pais(self, pais):
        self._pais = pais
    
    @property
    def valor(self):
        return self._valor
    
    @valor.setter
    def valor(self, valor):
        self._valor = valor

    @property
    def simbolo(self):
        return self._simbolo
    
    @simbolo.setter
    def simbolo(self, simbolo):
        self._simbolo = simbolo

    def toString(self):
        return f"Divisa {self.id}: {self.nombre}, {self.pais}, {self.simbolo}, {self.valor}"