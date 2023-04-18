from django import forms

class UsuarioPayPalF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idPayPal = forms.IntegerField(required = True)