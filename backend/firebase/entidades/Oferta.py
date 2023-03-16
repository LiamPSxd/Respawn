class Oferta:
    def __init__(self, id = 0, nombre = "", descuento = 0.0, tiempo = ""):
        self.id = id
        self.nombre = nombre
        self.descuento = descuento
        self.tiempo = tiempo

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
    def descuento(self):
        return self.descuento
    
    @descuento.setter
    def descuento(self, descuento):
        self.descuento = descuento

    @property
    def tiempo(self):
        return self.tiempo
    
    @tiempo.setter
    def tiempo(self, tiempo):
        self.tiempo = tiempo

    def toString(self):
        return "Oferta {}: {}, {}, {}".format(self.id, self.nombre, self.descuento, self.tiempo)