from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Comentario import Comentario

class UsuarioComentario:
    def __init__(self, idUsuario = Usuario.id, idComentario = Comentario.id):
        self._idUsuario = idUsuario
        self._idComentario = idComentario

    @property
    def idUsuario(self):
        return self._idUsuario

    @idUsuario.setter
    def idUsuario(self, idUsuario):
        self._idUsuario = idUsuario

    @property
    def idComentario(self):
        return self._idComentario

    @idComentario.setter
    def idComentario(self, idComentario):
        self._idComentario = idComentario

    def toString(self):
        return f"Usuario {self.idUsuario} - Comentario {self.idComentario}"