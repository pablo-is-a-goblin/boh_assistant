from django import forms
from . import models as my_models

# class NewSkillForm(forms.Form):
#     class Meta:
#         model = my_models.Skill
#         fields = my_models.Skill.get_params()

#     def __init__(self, *args, **kwargs):
#         user = kwargs.pop('user')
#         super().__init__(*args, **kwargs)
#         self.fields['principle1'].queryset = Sneaker.objects.filter(owner=user)


