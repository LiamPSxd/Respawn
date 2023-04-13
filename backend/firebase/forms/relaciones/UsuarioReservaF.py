from django import forms

class UsuarioReservaF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idReserva = forms.IntegerField(required = True)