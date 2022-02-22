from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("recipes", views.RecipeView, basename="recipes")
router.register("categories", views.CategoryView, basename="categories")
router.register("accounts", views.UserView, basename="accounts")

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("accounts/", include("rest_registration.api.urls")),
]
