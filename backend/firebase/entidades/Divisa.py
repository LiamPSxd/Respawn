class Divisa:
    def __init__(self, id = 0, nombre = "", pais = "", valor = "", simbolo = ""):
        self.id = id
        self.nombre = nombre
        self.pais = pais
        self.valor = valor
        self.simbolo = simbolo

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
    def pais(self):
        return self.pais
    
    @pais.setter
    def pais(self, pais):
        self.pais = pais
    
    @property
    def valor(self):
        self.valor = valor
    
    @valor.setter
    def valor(self, valor):
        self.valor = valor

    @property
    def simbolo(self):
        return self.simbolo
    
    @simbolo.setter
    def simbolo(self, simbolo):
        self.simbolo = simbolo

    def toString(self):
        return "Divisa {}: {}, {}, {}{}".format(self.id, self.nombre, self.pais, self.simbolo, self.valor)