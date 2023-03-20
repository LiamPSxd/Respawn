class Tarjeta:
    def __init__(self, id = 0, saldo = 0.0, tipo = "", pan = 0, fechaCaducidad = "", cvv = 0, titular = ""):
        self._id = id
        self._saldo = saldo
        self._tipo = tipo
        self._pan = pan
        self._fechaCaducidad = fechaCaducidad
        self._cvv = cvv
        self._titular = titular

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def saldo(self):
        return self._saldo
    
    @saldo.setter
    def saldo(self, saldo):
        self._saldo = saldo

    @property
    def tipo(self):
        return self._tipo
    
    @tipo.setter
    def tipo(self, tipo):
        self._tipo = tipo

    @property
    def pan(self):
        return self._pan
    
    @pan.setter
    def pan(self, pan):
        self._pan = pan

    @property
    def fechaCaducidad(self):
        return self._fechaCaducidad
    
    @fechaCaducidad.setter
    def fechaCaducidad(self, fechaCaducidad):
        self._fechaCaducidad = fechaCaducidad

    @property
    def cvv(self):
        return self._cvv
    
    @cvv.setter
    def cvv(self, cvv):
        self._cvv = cvv

    @property
    def titular(self):
        return self._titular
    
    @titular.setter
    def titular(self, titular):
        self._titular = titular

    def toString(self):
        return f"Tarjeta {self.id}: {self.saldo}, {self.tipo}, {self.pan}, {self.fechaCaducidad}, {self.cvv}, {self.titular}"