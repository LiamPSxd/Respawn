from django import forms

class DivisaF(forms.Form):
    _id = forms.IntegerField(required = True)
    _nombre = forms.CharField(max_length = 20, required = True)
    _pais =  forms.CharField(max_length = 30, required = True)
    _valor = forms.FloatField(required = True)
    _simbolo = forms.CharField(max_length = 3, required = True)
    _seleccionado = forms.NullBooleanField(required = True)
    _hora = forms.IntegerField(required = True)