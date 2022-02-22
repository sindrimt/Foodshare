from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Count
from .models import Category, Recipe


class RecipeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Recipe
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    recipe_count = serializers.IntegerField(source="recipe_set.count", read_only=True)

    class Meta:
        model = Category
        fields = "__all__"


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]
