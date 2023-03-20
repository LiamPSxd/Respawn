from django import forms

class CatalogoVideojuegoF(forms.Form):
    _idCatalogo = forms.IntegerField(required = True)
    _idVideojuego = forms.IntegerField(required = True)