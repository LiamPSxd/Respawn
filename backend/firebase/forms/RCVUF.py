from django import forms

class RCVUF(forms.Form):
    _idReserva = forms.IntegerField(required = True)
    _idCupon = forms.IntegerField(required = True)
    _idVideojuego = forms.IntegerField(required = True)
    _correoUsuario = forms.CharField(max_length = 70, required = True)