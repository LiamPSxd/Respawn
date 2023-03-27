from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.PayPal import PayPal

class UsuarioPayPal:
    def __init__(self, correoUsuario = Usuario.correo, idPayPal = PayPal.id):
        self._correoUsuario = correoUsuario
        self._idPayPal = idPayPal

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    @property
    def idPayPal(self):
        return self._idPayPal

    @idPayPal.setter
    def idPayPal(self, idPayPal):
        self._idPayPal = idPayPal

    def toString(self):
        return f"Usuario {self.correoUsuario} - PayPal {self.idPayPal}"