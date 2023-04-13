from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.WishList import WishList

class UsuarioWishList:
    def __init__(self, idUsuario = Usuario.id, idWishList = WishList.id):
        self.idUsuario = idUsuario
        self._idWishList = idWishList

    @property
    def idUsuario(self):
        return self.idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self.idUsuario = idUsuario

    @property
    def idWishList(self):
        return self._idWishList

    @idWishList.setter
    def idWishList(self, idWishList):
        self._idWishList = idWishList

    def toString(self):
        return f"Usuario {self.idUsuario} - WishList {self.idWishList}"