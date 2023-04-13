from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Reembolso import Reembolso

class UsuarioReembolso:
    def __init__(self, idUsuario = Usuario.id, idReembolso = Reembolso.id):
        self._idUsuario = idUsuario
        self._idReembolso = idReembolso

    @property
    def idUsuario(self):
        return self._idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self._idUsuario = idUsuario

    @property
    def idReembolso(self):
        return self._idReembolso

    @idReembolso.setter
    def idReembolso(self, idReembolso):
        self._idReembolso = idReembolso

    def toString(self):
        return f"Usuario {self.idUsuario} - Reembolso {self.idReembolso}"