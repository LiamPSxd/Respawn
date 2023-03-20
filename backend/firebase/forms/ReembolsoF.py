from django import forms

class ReembolsoF(forms.Form):
    _id = forms.IntegerField(required = True)