from django import forms

class UsuarioPayPalF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idPayPal = forms.IntegerField(required = True)