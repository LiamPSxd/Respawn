from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Compra import Compra

class UsuarioCompra:
    def __init__(self, idUsuario = Usuario.id, idCompra = Compra.id):
        self._idUsuario = idUsuario
        self._idCompra = idCompra

    @property
    def idUsuario(self):
        return self._idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self._idUsuario = idUsuario

    @property
    def idCompra(self):
        return self._idCompra

    @idCompra.setter
    def idCompra(self, idCompra):
        self._idCompra = idCompra

    def toString(self):
        return f"Usuario {self.idUsuario} - Compra {self.idCompra}"