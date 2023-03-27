from firebase.database.entidades.WishList import WishList
from firebase.database.entidades.Videojuego import Videojuego

class WishListVideojuego:
    def __init__(self, idWishList = WishList.id, idVideojuego = Videojuego.id):
        self._idWishList = idWishList
        self._idVideojuego = idVideojuego

    @property
    def idWishList(self):
        return self._idWishList

    @idWishList.setter
    def idWishList(self, idWishList):
        self._idWishList = idWishList

    @property
    def idVideojuego(self):
        return self._idVideojuego

    @idVideojuego.setter
    def idVideojuego(self, idVideojuego):
        self._idVideojuego = idVideojuego

    def toString(self):
        return f"WishList {self.idWishList} - Videojuego {self.idVideojuego}"