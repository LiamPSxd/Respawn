from django import forms

class UsuarioComentarioF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idComentario = forms.IntegerField(required = True)