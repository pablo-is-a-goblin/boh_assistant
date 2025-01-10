from django.shortcuts import render
from django.http import HttpResponse
from django.urls import reverse_lazy, reverse
from django.views import generic
from . import models as my_models
from . import forms as my_forms

# Create your views here.

get_model = {
    'principle': my_models.Principle,
    'skilllabel': my_models.SkillLabel,
    'objectlabel': my_models.ObjectLabel,
    'tongue': my_models.Tongue,
    'skill': my_models.Skill,
    'memory': my_models.Object,
    'book': my_models.Book,
}

list_des = {
    'principle': 'The powers that make up our reality',
    'skilllabel': '',
    'objectlabel': '',
    'tongue': 'Speach is a wound',
    'skill': 'Show me what you can do with those hands...',
    'memory': 'All you can remember',
    'book': 'Books are the memory that does not die'
}

form_model = {
    'principle': my_forms.BaseMateriaForm,
    'tongue': my_forms.BaseMateriaForm,
    'skilllabel': my_forms.BaseMateriaForm,
    'objectlabel': my_forms.BaseMateriaForm,
    'skill': my_forms.SkillForm,
    'memory': my_forms.ObjectForm,
    'book': my_forms.BookForm,
}

class myListView(generic.ListView):
    template_name = "wiki/list.html"
    context_object_name = "list"

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.model = get_model[self.kwargs["materia"]]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["type"] = self.kwargs["materia"]
        context["materia_des"] = list_des[self.kwargs["materia"]]
        return context
    
    def get_queryset(self):
        if self.model != my_models.Object:
            return super().get_queryset()
        return my_models.Object.objects.filter(object_type=self.kwargs["materia"].upper())

class myDetailView(generic.DetailView):
    template_name = "wiki/detail.html"
    context_object_name = "materia"

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.model = get_model[self.kwargs["materia"]]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["type"] = self.kwargs["materia"]
        return context

class myEditView(generic.UpdateView):
    template_name = "wiki/edit.html"
    context_object_name = "materia"

    def get_success_url(self):
        return reverse('wiki:detail', kwargs={'pk': self.kwargs['pk'], 'materia': self.kwargs['materia']})

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.model = get_model[self.kwargs["materia"]]
        self.form_class = form_model[self.kwargs["materia"]]

    def get_form_kwargs(self, *args, **kwargs):
        kwargs = super(myEditView, self).get_form_kwargs(*args, **kwargs)
        kwargs['materia'] = self.model
        return kwargs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["type"] = self.kwargs["materia"]
        return context
    
class myNewView(generic.CreateView):
    template_name = "wiki/new.html"
    context_object_name = "materia"

    def get_success_url(self):
        return reverse('wiki:list', kwargs={'materia': self.kwargs['materia']})

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.model = get_model[self.kwargs["materia"]]
        self.form_class = form_model[self.kwargs["materia"]]

    def get_form_kwargs(self, *args, **kwargs):
        kwargs = super(myNewView, self).get_form_kwargs(*args, **kwargs)
        kwargs['materia'] = self.model
        return kwargs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["type"] = self.kwargs["materia"]
        return context
