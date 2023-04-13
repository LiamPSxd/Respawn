from django import forms

class UsuarioCuponF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idCupon = forms.IntegerField(required = True)
    _cantidad = forms.IntegerField(required = True)