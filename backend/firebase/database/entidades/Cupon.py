class Cupon:
    def __init__(self, id = 0, nombre = "", descripcion = ""):
        self._id = id
        self._nombre = nombre
        self._descripcion = descripcion
        self._imagen = imagen

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
    def descripcion(self):
        return self._descripcion
    
    @descripcion.setter
    def descripcion(self, descripcion):
        self._descripcion = descripcion

    @property
    def imagen(self):
        return self._imagen
    
    @imagen.setter
    def imagen(self, imagen):
        self._imagen = imagen

    def toString(self):
        return f"Cupon {self.id}: {self.nombre}, {self.descripcion}, {self.imagen}"