class Oferta:
    def __init__(self, id = 0, nombre = "", descuento = 0.0, tiempo = ""):
        self._id = id
        self._nombre = nombre
        self._descuento = descuento
        self._tiempo = tiempo

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
    def descuento(self):
        return self._descuento
    
    @descuento.setter
    def descuento(self, descuento):
        self._descuento = descuento

    @property
    def tiempo(self):
        return self._tiempo
    
    @tiempo.setter
    def tiempo(self, tiempo):
        self._tiempo = tiempo

    def toString(self):
        return f"Oferta {self.id}: {self.nombre}, {self.descuento}, {self.tiempo}"