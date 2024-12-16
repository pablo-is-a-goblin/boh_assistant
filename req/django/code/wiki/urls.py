from django.urls import path

from . import views
from . import models 

app_name = "wiki"
urlpatterns = [
    path("<str:materia>/", views.myListView.as_view(), name="list"),
    path("<str:materia>/<int:pk>/", views.myDetailView.as_view(), name="detail"),
    path("<str:materia>/edit/<int:pk>/", views.myEditView.as_view(), name="edit"),
    path("<str:materia>/new/", views.myNewView.as_view(), name="new"),

    path("principle/new/", views.NewPrincipleView.as_view(), name="principle_new"),
    path("principle/edit/<int:pk>/", views.EditPrincipleView.as_view(), name="principle_edit"),
    path("skill/new/", views.NewSkillView.as_view(), name="skill_new"),
]
