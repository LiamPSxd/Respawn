from django import forms

class FiltroF(forms.Form):
    _id = forms.IntegerField(required = True)
    _nombre = forms.CharField(max_length = 50, required = True)
    _contenido = forms.CharField(max_length = 500, required = True)