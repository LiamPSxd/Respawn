from django import forms

class WVUF(forms.Form):
    _idWishList = forms.IntegerField(required = True)
    _idVideojuego = forms.IntegerField(required = True)
    _correoUsuario = forms.CharField(max_length = 70, required = True)