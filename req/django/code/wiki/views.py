from django.shortcuts import render
from django.http import HttpResponse
from django.urls import reverse_lazy, reverse
from django.views import generic
from . import models as my_models
from . import forms as my_forms
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.

get_model = {
    'principle': my_models.Principle,
    'skill_label': my_models.SkillLabel,
    'object_label': my_models.ObjectLabel,
    'tongue': my_models.Tongue,
    'skill': my_models.Skill,
    'memory': my_models.Object,
    'thing': my_models.Object,
    'beast': my_models.Object,
    'book': my_models.Book,
}

list_des = {
    'principle': 'The powers that make up our reality',
    'skill_label': '',
    'object_label': '',
    'tongue': 'Speach is a wound',
    'skill': 'Show me what you can do with those hands...',
    'memory': 'All you can remember',
    'thing': '',
    'beast': '',
    'book': 'Books are the memory that does not die'
}

read_serializers = {
    'principle': PrincipleSerializer,
    'tongue': TongueSerializer,
    'skill_label': SkillLabelSerializer,
    'object_label': ObjectLabelSerializer,
    'skill': ReadSkillSerializer,
}

write_serializers = {
    'principle': PrincipleSerializer,
    'tongue': TongueSerializer,
    'skill_label': SkillLabelSerializer,
    'object_label': ObjectLabelSerializer,
    'skill': WriteSkillSerializer,
}

form_model = {
    'principle': my_forms.BaseMateriaForm,
    'tongue': my_forms.BaseMateriaForm,
    'skill_label': my_forms.BaseMateriaForm,
    'object_label': my_forms.BaseMateriaForm,
    'skill': my_forms.SkillForm,
    'memory': my_forms.ObjectForm,
    'thing': my_forms.ObjectForm,
    'beast': my_forms.ObjectForm,
    'book': my_forms.BookForm,
}

@api_view(['GET', 'POST'])
def api_list(request, materia):
    if request.method == 'GET':
        data = get_model[materia].objects.all()

        serializer = read_serializers[materia](data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = write_serializers[materia](data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def api_detail(request, materia, pk):
    try:
        data = get_model[materia].objects.get(pk=pk)
    except get_model[materia].DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = write_serializers[materia](data, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
