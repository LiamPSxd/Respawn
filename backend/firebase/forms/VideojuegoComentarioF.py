from django import forms

class VideojuegoComentarioF(forms.Form):
    _idVideojuego = forms.IntegerField(required = True)
    _idComentario = forms.IntegerField(required = True)