from django import forms

class UsuarioReembolsoF(forms.Form):
    _correoUsuario = forms.CharField(max_length = 70, required = True)
    _idReembolso = forms.IntegerField(required = True)