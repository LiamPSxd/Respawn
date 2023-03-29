from django import forms

class VideojuegoF(forms.Form):
    _id = forms.IntegerField(required = True)
    _nombre = forms.CharField(max_length = 30, required = True)
    _descripcion = forms.CharField(max_length = 500, required = True)
    _caratula = forms.ImageField(required = True)
    _video = forms.URLField(required = True)
    _precio = forms.FloatField(required = True)
    _genero = forms.CharField(max_length = 250, required = True)
    _plataforma = forms.CharField(max_length = 20, required = True)
    _datosExtra = forms.CharField(max_length = 500, required = True)
    _calificacion = forms.FloatField(required = True)