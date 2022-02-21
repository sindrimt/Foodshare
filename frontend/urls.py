from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("recipe", index),
    path("created", index),
    path("browse-recipes", index),
]
