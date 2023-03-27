from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.WishList import WishList

class UsuarioWishList:
    def __init__(self, correoUsuario = Usuario.correo, idWishList = WishList.id):
        self._correoUsuario = correoUsuario
        self._idWishList = idWishList

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    @property
    def idWishList(self):
        return self._idWishList

    @idWishList.setter
    def idWishList(self, idWishList):
        self._idWishList = idWishList

    def toString(self):
        return f"Usuario {self.correoUsuario} - WishList {self.idWishList}"