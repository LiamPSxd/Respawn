from . import Usuario

class Tarjeta:
    def __init__(self, id = 0, saldo = 0.0, tipo = "", pan = 0, fechaCaducidad = "", cvv = 0, titular = "", usuario = Usuario):
        self.id = id
        self.saldo = saldo
        self.tipo = tipo
        self.pan = pan
        self.fechaCaducidad = fechaCaducidad
        self.cvv = cvv
        self.titular = titular
        self.usuario = usuario

    @property
    def id(self):
        return self.id

    @property
    def saldo(self):
        return self.saldo
    
    @saldo.setter
    def saldo(self, saldo):
        self.saldo = saldo

    @property
    def tipo(self):
        return self.tipo
    
    @tipo.setter
    def tipo(self, tipo):
        self.tipo = tipo

    @property
    def pan(self):
        return self.pan
    
    @pan.setter
    def pan(self, pan):
        self.pan = pan

    @property
    def fechaCaducidad(self):
        return self.fechaCaducidad
    
    @fechaCaducidad.setter
    def fechaCaducidad(self, fechaCaducidad):
        self.fechaCaducidad = fechaCaducidad

    @property
    def cvv(self):
        return self.cvv
    
    @cvv.setter
    def cvv(self, cvv):
        self.cvv = cvv

    @property
    def usuario(self):
        return self.usuario
    
    @usuario.setter
    def usuario(self, usuario):
        self.usuario = usuario

    @property
    def titular(self):
        return self.titular
    
    @titular.setter
    def titular(self, titular):
        self.titular = titular

    def toString(self):
        return "Tarjeta {}: {}, {}, {}, {}, {}, {}, {}".format(self.id, self.saldo, self.tipo, self.pan, self.fechaCaducidad, self.cvv, self.titular, self.usuario.getNombre())