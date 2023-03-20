from firebase.database.entidades.Comentario import Comentario
from firebase.database.entidades.Usuario import Usuario

class ComentarioUsuario:
    def __init__(self, idComentario = Comentario.id, correoUsuario = Usuario.correo):
        self._idComentario = idComentario
        self._correoUsuario = correoUsuario

    @property
    def idComentario(self):
        return self._idComentario

    @idComentario.setter
    def idComentario(self, idComentario):
        self._idComentario = idComentario

    @property
    def correoUsuario(self):
        return self._correoUsuario

    @correoUsuario.setter
    def correoUsuario(self, correoUsuario):
        self._correoUsuario = correoUsuario

    def toString(self):
        return f"Comentario {self.idComentario} - Usuario {self.correoUsuario}"