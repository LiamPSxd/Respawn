from django import forms

class UsuarioComentarioF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idComentario = forms.IntegerField(required = True)