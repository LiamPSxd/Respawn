from django import forms

class UsuarioReservaF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idReserva = forms.IntegerField(required = True)