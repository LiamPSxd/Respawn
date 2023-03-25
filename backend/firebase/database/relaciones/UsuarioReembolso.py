from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Reembolso import Reembolso

class UsuarioReembolso:
    def __init__(self, correoUsuario = Usuario.correo, idReembolso = Reembolso.id):
        self._correoUsuario = correoUsuario
        self._idReembolso = idReembolso

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    @property
    def idReembolso(self):
        return self._idReembolso

    @idReembolso.setter
    def idReembolso(self, idReembolso):
        self._idReembolso = idReembolso

    def toString(self):
        return f"Usuario {self.correoUsuario} - Reembolso {self.idReembolso}"