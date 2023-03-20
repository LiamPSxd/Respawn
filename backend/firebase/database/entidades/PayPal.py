class PayPal:
    def __init__(self, id = 0, saldo = 0, correo = "", contrasenia = "", titular = ""):
        self._id = id
        self._saldo = saldo
        self._correo = correo
        self._contrasenia = contrasenia
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
    def correo(self):
        return self._correo
    
    @correo.setter
    def correo(self, correo):
        self._correo = correo

    @property
    def contrasenia(self):
        return self._contrasenia
    
    @contrasenia.setter
    def contrasenia(self, contrasenia):
        self._contrasenia = contrasenia

    @property
    def titular(self):
        return self._titular
    
    @titular.setter
    def titular(self, titular):
        self._titular = titular

    def toString(self):
        return f"PayPal {self.id}: {self.saldo}, {self.correo}, {self.contrasenia}, {self.titular}"