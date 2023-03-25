from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Compra import Compra

class UsuarioCompra:
    def __init__(self, correoUsuario = Usuario.correo, idCompra = Compra.id):
        self._correoUsuario = correoUsuario
        self._idCompra = idCompra

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    @property
    def idCompra(self):
        return self._idCompra

    @idCompra.setter
    def idCompra(self, idCompra):
        self._idCompra = idCompra

    def toString(self):
        return f"Usuario {self.correoUsuario} - Compra {self.idCompra}"