from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def trying(request):
    return HttpResponse("It worked!")
