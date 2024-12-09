from django import forms

class NewPrincipleForm(forms.Form):
    name = forms.CharField()
    description = forms.CharField()
