from django import forms

class ComentarioF(forms.Form):
    _id = forms.IntegerField(required = True)
    _titulo = forms.CharField(max_length = 30, required = True)
    _contenido = forms.CharField(max_length = 250, required = True)