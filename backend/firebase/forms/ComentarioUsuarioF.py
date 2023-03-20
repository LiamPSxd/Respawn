from django import forms

class ComentarioUsuarioF(forms.Form):
    _idComentario = forms.IntegerField(required = True)
    _correoUsuario = forms.CharField(max_length = 70, required = True)