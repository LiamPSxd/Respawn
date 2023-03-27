from firebase.database.entidades.Usuario import Usuario
from firebase.database.entidades.Comentario import Comentario

class UsuarioComentario:
    def __init__(self, correoUsuario = Usuario.correo, idComentario = Comentario.id):
        self._correoUsuario = correoUsuario
        self._idComentario = idComentario

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    @property
    def idComentario(self):
        return self._idComentario

    @idComentario.setter
    def idComentario(self, idComentario):
        self._idComentario = idComentario

    def toString(self):
        return f"Usuario {self.correoUsuario} - Comentario {self.idComentario}"