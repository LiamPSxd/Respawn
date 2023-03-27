from django import forms

class UsuarioCompraF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idCompra = forms.IntegerField(required = True)