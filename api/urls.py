from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path("recipes", views.RecipeView.as_view()),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
