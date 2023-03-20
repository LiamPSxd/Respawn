from django import forms

class FiltroCatalogoF(forms.Form):
    _idFiltro = forms.IntegerField(required = True)
    _idCatalogo = forms.IntegerField(required = True)