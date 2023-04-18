from django import forms

class ReservaReembolsoF(forms.Form):
    _idReserva = forms.IntegerField(required = True)
    _idReembolso = forms.IntegerField(required = True)