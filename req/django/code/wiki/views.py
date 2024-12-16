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
    'skill': my_models.Skill,
}

list_des = {
    'principle': 'The powers that make up our reality',
    'skilllabel': '',
    'skill': 'Show me what you can do with those hands',
}

class myListView(generic.ListView):
    template_name = "wiki/list.html"
    context_object_name = "list"
    ordering = ['name']

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.model = get_model[self.kwargs["materia"]]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["type"] = self.kwargs["materia"]
        context["materia_des"] = list_des[self.kwargs["materia"]]
        return context

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
        self.fields = self.model.get_params()

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
        self.fields = self.model.get_params()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["type"] = self.kwargs["materia"]
        return context

class NewPrincipleView(generic.CreateView):
    template_name = "wiki/principle_new.html"
    model = my_models.Principle
    fields = my_models.Principle.get_params()
    success_url = reverse_lazy("wiki:principle_list")

class EditPrincipleView(generic.UpdateView):
    template_name = "wiki/principle_edit.html"
    model = my_models.Principle
    fields = my_models.Principle.get_params()
    def get_success_url(self):
        return reverse('wiki:principle_detail', kwargs={'pk': self.kwargs['pk']})

class ListTongueView(generic.ListView):
    model = my_models.Tongue
    template_name = "wiki/tongue_list.html"

class DetailTongueView(generic.DetailView):
    model = my_models.Tongue
    template_name = "wiki/tongue_detail.html"

class NewTongueView(generic.CreateView):
    template_name = "wiki/tongue_new.html"
    model = my_models.Tongue
    fields = my_models.Tongue.get_params()
    success_url = reverse_lazy("wiki:tongue_list")

class ListSkillView(generic.ListView):
    model = my_models.Skill
    template_name = "wiki/skill_list.html"

class DetailSkillView(generic.DetailView):
    model = my_models.Skill
    template_name = "wiki/skill_detail.html"

class NewSkillView(generic.CreateView):
    template_name = "wiki/skill_new.html"
    model = my_models.Skill
    fields = my_models.Skill.get_params()
    success_url = reverse_lazy("wiki:skill_list")
