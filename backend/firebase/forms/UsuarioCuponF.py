from django import forms

class UsuarioCuponF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idCupon = forms.IntegerField(required = True)
    _cantidad = forms.IntegerField(required = True)