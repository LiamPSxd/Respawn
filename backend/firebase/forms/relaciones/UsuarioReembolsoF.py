from django import forms

class UsuarioReembolsoF(forms.Form):
    _idUsuario = forms.IntegerField(required = True)
    _idReembolso = forms.IntegerField(required = True)