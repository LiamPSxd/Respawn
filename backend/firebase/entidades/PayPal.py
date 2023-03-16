from . import Usuario

class PayPal:
    def __init__(self, id = 0, saldo = 0, correo = "", contrasenia = "", titular = "", usuario = Usuario):
        self.id = id
        self.saldo = saldo
        self.correo = correo
        self.contrasenia = contrasenia
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
    def correo(self):
        return self.correo
    
    @correo.setter
    def correo(self, correo):
        self.correo = correo

    @property
    def contrasenia(self):
        return self.contrasenia
    
    @contrasenia.setter
    def contrasenia(self, contrasenia):
        self.contrasenia = contrasenia

    @property
    def titular(self):
        return self.titular
    
    @titular.setter
    def titular(self, titular):
        self.titular = titular

    @property
    def usuario(self):
        return self.usuario
    
    @usuario.setter
    def usuario(self, usuario):
        self.usuario = usuario

    def toString(self):
        return "PayPal {}: {}, {}, {}, {}, {}, {}".format(self.id, self.saldo, self.correo, self.contrasenia, self.titular, self.usuario)