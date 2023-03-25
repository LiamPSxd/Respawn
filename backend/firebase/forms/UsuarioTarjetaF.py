from django import forms

class UsuarioTarjetaF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idTarjeta = forms.IntegerField(required = True)