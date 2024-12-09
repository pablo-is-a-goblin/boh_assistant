from django.urls import path

from . import views

app_name = "wiki"
urlpatterns = [
    path("principle/", views.ListPrincipleView.as_view(), name="principle_list"),
    path("principle/<int:pk>/", views.DetailPrincipleView.as_view(), name="principle_detail"),
    path("principle/new/", views.NewPrincipleView.as_view(), name="principle_new"),
]
