from django import forms

class UsuarioWishListF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idWishList = forms.IntegerField(required = True)