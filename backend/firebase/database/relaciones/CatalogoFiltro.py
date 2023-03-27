from firebase.database.entidades.Catalogo import Catalogo
from firebase.database.entidades.Filtro import Filtro

class CatalogoFiltro:
    def __init__(self, idCatalogo = Catalogo.id, idFiltro = Filtro.id):
        self._idCatalogo = idCatalogo
        self._idFiltro = idFiltro

    @property
    def idCatalogo(self):
        return self._idCatalogo

    @idCatalogo.setter
    def idCatalogo(self, idCatalogo):
        self._idCatalogo = idCatalogo

    @property
    def idFiltro(self):
        return self._idFiltro

    @idFiltro.setter
    def idFiltro(self, idFiltro):
        self._idFiltro = idFiltro

    def toString(self):
        return f"Catalogo {self.idCatalogo} - Filtro {self.idFiltro}"