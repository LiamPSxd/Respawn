from django import forms

class CatalogoFiltroF(forms.Form):
    _idCatalogo = forms.IntegerField(required = True)
    _idFiltro = forms.IntegerField(required = True)