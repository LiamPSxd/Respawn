from django import forms

class TarjetaF(forms.Form):
    _id = forms.IntegerField(required = True)
    _saldo = forms.FloatField(required = True)
    _tipo = forms.CharField(max_length = 10, required = True)
    _pan = forms.IntegerField(max_value = 9999999999999999, min_value = 0, required = True)
    _fechaCaducidad = forms.DateField(required = True)
    _cvv = forms.IntegerField(max_value = 999, min_value = 0, required = True)
    _titular = forms.CharField(max_length = 100, required = True)