from django import forms

class PayPalF(forms.Form):
    _id = forms.IntegerField(required = True)
    _saldo = forms.FloatField(required = True)
    _correo = forms.CharField(max_length = 70, required = True)
    _contrasenia = forms.CharField(max_length = 50, required = True)
    _titular = forms.CharField(max_length = 100, required = True)