from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Category, Recipe


class CategorySerializer(serializers.ModelSerializer):

    recipe_count = serializers.IntegerField(
        source="recipes.count", read_only=True, default=-1  # in case of problems
    )

    class Meta:
        model = Category
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        default="",
    )

    class Meta:
        model = Recipe
        fields = "__all__"
        read_only_fields = ["author"]  # this is set automatically


class UserSerializer(serializers.ModelSerializer):
    recipes = serializers.HyperlinkedRelatedField(
        many=True, view_name="recipes-detail", read_only=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "date_joined",
            "last_login",
            "is_superuser",
            "recipes",
        ]
