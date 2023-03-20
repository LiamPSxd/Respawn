from firebase.database.entidades.PayPal import PayPal
from firebase.database.entidades.Usuario import Usuario

class PayPalUsuario:
    def __init__(self, idPayPal = PayPal.id, correoUsuario = Usuario.correo):
        self._idPayPal = idPayPal
        self._correoUsuario = correoUsuario

    @property
    def idPayPal(self):
        return self._idPayPal

    @idPayPal.setter
    def idPayPal(self, idPayPal):
        self._idPayPal = idPayPal

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    def toString(self):
        return f"PayPal {self.idPayPal} - Usuario {self.correoUsuario}"