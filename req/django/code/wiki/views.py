from django.shortcuts import render
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views import generic
from . import models as my_models
from . import forms as my_forms

# Create your views here.

class ListPrincipleView(generic.ListView):
    model = my_models.Principle
    template_name = "wiki/principle_list.html"

class DetailPrincipleView(generic.DetailView):
    model = my_models.Principle
    template_name = "wiki/principle_detail.html"

class NewPrincipleView(generic.CreateView):
    template_name = "wiki/principle_new.html"
    model = my_models.Principle
    fields  = my_models.Principle.get_params()
    success_url = reverse_lazy("wiki:principle_list")
