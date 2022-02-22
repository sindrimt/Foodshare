from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("recipes", views.RecipeView, basename="recipes")
router.register("categories", views.CategoryView, basename="categories")
router.register("users", views.UserView, basename="users")

urlpatterns = [
    path("", include(router.urls)),
    path("users/register", views.RegisterApi.as_view(), name="register"),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
