from firebase.database.entidades.Filtro import Filtro
from firebase.database.entidades.Catalogo import Catalogo

class FiltroCatalogo:
    def __init__(self, idFiltro = Filtro.id, idCatalogo = Catalogo.id):
        self._idFiltro = idFiltro
        self._idCatalogo = idCatalogo

    @property
    def idFiltro(self):
        return self._idFiltro

    @idFiltro.setter
    def idFiltro(self, idFiltro):
        self._idFiltro = idFiltro

    @property
    def idCatalogo(self):
        return self._idCatalogo

    @idCatalogo.setter
    def idCatalogo(self, idCatalogo):
        self._idCatalogo = idCatalogo

    def toString(self):
        return f"Filtro {self.idFiltro} - Catalogo {self.idCatalogo}"