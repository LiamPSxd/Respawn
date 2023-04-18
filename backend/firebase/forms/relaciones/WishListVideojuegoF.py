from django import forms

class WishListVideojuegoF(forms.Form):
    _idWishList = forms.IntegerField(required = True)
    _idVideojuego = forms.IntegerField(required = True)