from django import forms

class MensajeF(forms.Form):
    _titulo = forms.CharField(max_length = 100, required = True)
    _descripcion = forms.CharField(max_length = 200, required = True)
    _tipo = forms.IntegerField(max_value = 3, min_value = 0, required = True)