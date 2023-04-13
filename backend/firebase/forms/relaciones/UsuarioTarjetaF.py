from django import forms

class UsuarioTarjetaF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idTarjeta = forms.IntegerField(required = True)