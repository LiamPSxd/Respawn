from django import forms

class UsuarioCompraF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idCompra = forms.IntegerField(required = True)