from django import forms

class UsuarioF(forms.Form):
    _id = forms.IntegerField(required = True)
    _nombre = forms.CharField(max_length = 20, required = True)
    _correo = forms.CharField(max_length = 70, required = True)
    _contrasenia = forms.CharField(max_length = 20, required = True)
    _domicilio = forms.CharField(max_length = 150, required = True)