from django import forms

class CatalogoF(forms.Form):
    _id = forms.IntegerField(required = True)
    _nombre = forms.CharField(max_length = 20, required = True)
    _banner = forms.ImageField(required = True)