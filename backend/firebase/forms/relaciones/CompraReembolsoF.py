from django import forms

class CompraReembolsoF(forms.Form):
    _idCompra = forms.IntegerField(required = True)
    _idReembolso = forms.IntegerField(required = True)