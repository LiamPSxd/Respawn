from django import forms

class WishListF(forms.Form):
    _id = forms.IntegerField(required = True)