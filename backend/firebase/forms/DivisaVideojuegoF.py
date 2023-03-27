from django import forms

class DivisaVideojuegoF(forms.Form):
    _idDivisa = forms.IntegerField(required = True)
    _idVideojuego = forms.IntegerField(required = True)