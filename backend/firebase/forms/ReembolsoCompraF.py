from django import forms

class ReembolsoCompraF(forms.Form):
    _idReembolso = forms.IntegerField(required = True)
    _idCompra = forms.IntegerField(required = True)