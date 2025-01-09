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

class BaseMateriaForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self._meta.model = kwargs.pop("materia")
        self._meta.fields = self._meta.model.get_params()
        super(BaseMateriaForm, self).__init__(*args, **kwargs)
        
    name = forms.CharField()
    description = forms.CharField(widget=forms.Textarea(), required=False)
    image = forms.ImageField(required=False)

class SkillForm(forms.ModelForm):
    class Meta:
        model = my_models.Skill
        fields = my_models.Skill.get_params()

    name = forms.CharField()
    description = forms.CharField(widget=forms.Textarea(), required=False)
    image = forms.ImageField(required=False)
    aspects = forms.ModelMultipleChoiceField(
        queryset=my_models.SkillLabel.objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )

    def __init__(self, *args, **kwargs):
        kwargs.pop("materia")
        super(SkillForm, self).__init__(*args, **kwargs)
        self.fields['aspects'].required = False

class ObjectForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        kwargs.pop("materia")
        self._meta.model = my_models.Object
        super(ObjectForm, self).__init__(*args, **kwargs)
        self._meta.fields = self._meta.model.get_params(self.instance)
        for principle in my_models.Principle.objects.all().iterator():
            self.fields[principle.name + "_quantity"] = forms.IntegerField()  
            self.fields[principle.name + "_quantity"].required = False
        if kwargs["instance"] != None:
            for qty in my_models.ObjectHasPrinciple.objects.filter(obj=self.instance).iterator():
                self.initial[qty.principle.name + "_quantity"] = qty.qty
        self.fields['aspects'].required = False

    name = forms.CharField()
    description = forms.CharField(widget=forms.Textarea(), required=False)
    aspects = forms.ModelMultipleChoiceField(
        queryset=my_models.ObjectLabel.objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )
    image = forms.ImageField(required=False)
    object_type = forms.ChoiceField(choices=my_models.OBJECT_TYPE)

    def save(self, commit=True):
        instance = super().save(commit=commit)
        
        for principle in my_models.Principle.objects.all().iterator():
            if my_models.ObjectHasPrinciple.objects.filter(obj=instance, principle=principle):
                pass
            else:
                if self.cleaned_data.get(principle.name + "_quantity"):
                    my_models.ObjectHasPrinciple.objects.create(
                        obj=instance,
                        principle=principle,
                        qty=self.cleaned_data[principle.name + '_quantity']
                    )
        
        return instance
