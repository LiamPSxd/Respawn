from django import forms

class ReservaF(forms.Form):
    _id = forms.IntegerField(required = True)
    _fecha = forms.DateField(required = True)
    _hora = forms.DurationField(required = True)
    _iva = forms.FloatField(required = True)
    _descuento = forms.FloatField(required = True)
    _monto = forms.FloatField(required = True)
    _metodo = forms.CharField(max_length = 10, required = True)
    _descripcion = forms.CharField(max_length = 250, required = True)