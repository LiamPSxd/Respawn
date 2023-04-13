from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.PayPal import PayPal

class UsuarioPayPal:
    def __init__(self, idUsuario = Usuario.id, idPayPal = PayPal.id):
        self._idUsuario = idUsuario
        self._idPayPal = idPayPal

    @property
    def idUsuario(self):
        return self._idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self._idUsuario = idUsuario

    @property
    def idPayPal(self):
        return self._idPayPal

    @idPayPal.setter
    def idPayPal(self, idPayPal):
        self._idPayPal = idPayPal

    def toString(self):
        return f"Usuario {self.idUsuario} - PayPal {self.idPayPal}"