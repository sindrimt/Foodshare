from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path("recipe_list", views.RecipeListView.as_view()),
    path("recipe/<int:pk>", views.RecipeView.as_view()),
    path("recipe_new", views.RecipeCreateView.as_view()),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
