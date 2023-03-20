from django import forms

class OfertaF(forms.Form):
    _id = forms.IntegerField(required = True)
    _nombre = forms.CharField(max_length = 50, required = True)
    _descuento = forms.FloatField(required = True)
    _tiempo = forms.DateField(required = True)