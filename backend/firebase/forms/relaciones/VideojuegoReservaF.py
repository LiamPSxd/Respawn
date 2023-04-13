from django import forms

class VideojuegoReservaF(forms.Form):
    _idVideojuego = forms.IntegerField(required = True)
    _idReserva = forms.IntegerField(required = True)