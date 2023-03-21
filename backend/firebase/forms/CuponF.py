from django import forms

class CuponF(forms.Form):
    _id = forms.IntegerField(required = True)
    _nombre = forms.CharField(max_length = 50, required = True)
    _descripcion = forms.CharField(max_length = 250, required = True)
    _cantidad = forms.IntegerField(required = True)