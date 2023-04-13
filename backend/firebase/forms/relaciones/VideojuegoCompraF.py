from django import forms

class VideojuegoCompraF(forms.Form):
    _idVideojuego = forms.IntegerField(required = True)
    _idCompra = forms.IntegerField(required = True)