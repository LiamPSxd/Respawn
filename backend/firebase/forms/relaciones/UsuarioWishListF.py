from django import forms

class UsuarioWishListF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idWishList = forms.IntegerField(required = True)