class Cupon:
    def __init__(self, id = 0, nombre = "", descripcion = ""):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion

    @property
    def id(self):
        self.id = id

    @property
    def nombre(self):
        return self.nombre
    
    @nombre.setter
    def nombre(self, nombre):
        self.nombre = nombre

    @property
    def descripcion(self):
        return self.descripcion
    
    @descripcion.setter
    def descripcion(self, descripcion):
        self.descripcion = descripcion

    def toString(self):
        return "Cupon {}: {}, {}".format(self.id, self.nombre, self.descripcion)