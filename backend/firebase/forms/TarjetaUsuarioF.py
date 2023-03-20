from django import forms

class TarjetaUsuarioF(forms.Form):
    _idTarjeta = forms.IntegerField(required = True)
    _correoUsuario = forms.CharField(max_length = 70, required = True)