from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets, response, status
from rest_framework.views import APIView
from rest_framework.response import Response


from .models import Category, Recipe
from .serializers import RecipeSerializer, CategorySerializer, UserSerializer


class RecipeView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filterset_fields = (
        "title",
        "content",
        "category",
    )


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]
