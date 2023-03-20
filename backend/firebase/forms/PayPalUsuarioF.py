from django import forms

class PayPalUsuarioF(forms.Form):
    _idPayPal = forms.IntegerField(required = True)
    _correoUsuario = forms.CharField(max_length = 70, required = True)