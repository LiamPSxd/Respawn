from django import forms

class VideojuegoOfertaF(forms.Form):
    _idVideojuego = forms.IntegerField(required = True)
    _idOferta = forms.IntegerField(required = True)